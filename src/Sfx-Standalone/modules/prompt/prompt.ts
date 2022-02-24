//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// Licensed under the MIT License. See License file under the project root for license information.
//-----------------------------------------------------------------------------

import { ISfxModuleManager } from "sfx.module-manager";
import { IPrompt, IPromptService, IPromptOptions } from "sfx.prompt";

import { Menu, BrowserWindow, ipcMain, BrowserWindowConstructorOptions  } from "electron";

import { local } from "donuts.node/path";
import * as utils from "donuts.node/utils";
import * as electron from "electron";
import * as appUtils from "../../utilities/appUtils";
import { ChannelNameFormat, EventNames } from "./constants";

class Prompt<TResult> implements IPrompt<TResult> {
    public get disposed(): boolean {
        return this.promise === undefined;
    }

    private readonly moduleManager: ISfxModuleManager;
    private readonly promptOptions: IPromptOptions;

    private promise: Promise<TResult>;
    private promise_resolve: (result: TResult) => void;
    private promise_reject: (reason?: any) => void;
    private promptWindow: BrowserWindow;
    private promptResult: TResult;

    private id = Math.round(Math.random() * 100).toString();

    constructor(moduleManager: ISfxModuleManager, promptOptions: IPromptOptions) {
        this.moduleManager = moduleManager;
        this.promptOptions = promptOptions;
        this.promise = new Promise((resolve, reject) => {
            this.promise_reject = reject;
            this.promise_resolve = resolve;
        });
    }

    public async initializeAsync(): Promise<void> {
        this.validateDisposal();

        this.promptWindow =
            await this.moduleManager.getComponentAsync(
                "electron.browser-window",
                <BrowserWindowConstructorOptions>{
                    frame: utils.pick(this.promptOptions.frame, true),
                    maximizable: false,
                    minimizable: utils.pick(this.promptOptions.minimizable, false),
                    closable: utils.pick(this.promptOptions.closable, true),
                    show: false,
                    modal: true,
                    fullscreenable: false,
                    useContentSize: true,
                    resizable: utils.pick(this.promptOptions.resizable, true),
                    parent: this.promptOptions.parentWindowId ? electron.BrowserWindow.fromId(this.promptOptions.parentWindowId) : electron.BrowserWindow.getFocusedWindow(),
                    icon: utils.pick(this.promptOptions.icon, appUtils.getIconPath()),
                    webPreferences: {
                        preload: local("./preload.js"),
                        nodeIntegration: true,
                        contextIsolation: false,
                        devTools: true
                    }
                });

        this.promptOptions.showMenu = utils.pick(this.promptOptions.showMenu, false);
        this.promptWindow.setMenuBarVisibility(this.promptOptions.showMenu);

        this.promptWindow.webContents.openDevTools();

        if (this.promptOptions.showMenu && utils.isObject(this.promptOptions.menuTemplate)) {
            if (process.platform !== "darwin") {
                this.promptWindow.setMenu(Menu.buildFromTemplate(this.promptOptions.menuTemplate));

            } else {
                Menu.setApplicationMenu(Menu.buildFromTemplate(this.promptOptions.menuTemplate));
            }
        }

        // Size has to be set after menu settings applied, otherwise the size will be inaccurate.
        this.promptWindow.setContentSize(utils.pick(this.promptOptions.width, 640), utils.pick(this.promptOptions.height, 480));

        this.promptWindow.once("ready-to-show", () => {
            this.promptWindow.show();
        });

        this.promptWindow.webContents.once("crashed", (event, killed) => {
            if (!killed && !this.promptWindow.isDestroyed()) {
                this.promptWindow.destroy();
            }

            this.cleanupIpcListeners();
            this.promise_reject("crashed");
        });

        this.promptWindow.on("close", (event) => {
            this.cleanupIpcListeners();
            this.promise_resolve(this.promptResult);
        });

        ipcMain.once(
            utils.string.format(ChannelNameFormat, this.id, EventNames.Finished),
            (event: Electron.Event, result: any) => this.promptResult = result);

        ipcMain.once(
            utils.string.format(ChannelNameFormat, this.id, EventNames.RequestPromptOptions),
            (event: Electron.Event) => (event.returnValue as any) = this.promptOptions);

            console.log(this, this.id);
    }

    public openAsync(): Promise<TResult> {
        this.validateDisposal();

        if (!this.promptWindow) {
            throw new Error("Prompt is not initialized.");
        }

        console.log(this)

        this.promptWindow.loadFile(this.promptOptions.pageUrl, {query: {"promptId": this.id.toString() }});
        return this.promise;
    }

    private cleanupIpcListeners() {
        for (const eventName in EventNames) {
            ipcMain.removeAllListeners(utils.string.format(ChannelNameFormat, this.id, eventName));
        }
    }

    private validateDisposal(): void {
        if (this.disposed) {
            throw new Error("Prompt already disposed.");
        }
    }
}

export class PromptService implements IPromptService {
    private readonly moduleManager: ISfxModuleManager;

    constructor(moduleManager: ISfxModuleManager) {
        if (!utils.isObject(moduleManager)) {
            throw new Error("valid moduleManager must be supplied.");
        }

        this.moduleManager = moduleManager;
    }

    public async createAsync<TResult>(promptOptions: IPromptOptions): Promise<IPrompt<TResult>> {
        const prompt = new Prompt<TResult>(this.moduleManager, promptOptions);

        await prompt.initializeAsync();
        console.log(prompt)
        return prompt;
    }
}
