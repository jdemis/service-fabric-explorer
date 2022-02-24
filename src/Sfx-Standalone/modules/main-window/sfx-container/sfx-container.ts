
//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// Licensed under the MIT License. See License file under the project root for license information.
//-----------------------------------------------------------------------------

import * as $ from "jquery";
// const uuidv5 = require("uuid/v3");
import { v5 as uuidv5 } from "uuid";

import { WebviewTag } from "electron";
import * as electron from "electron";
import { ISfxContainer } from "sfx.sfx-view-container";
import { resolve } from "donuts.node/path";
import * as shell from "donuts.node/shell";
import { ICluster } from "sfx.cluster-list";
import { IHttpClient } from "sfx.http";

interface IClusterWithId extends ICluster {
    id: string;
}
export class SfxContainer implements ISfxContainer {
    static UrlUuidNameSpace: string = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    private endpoints: IClusterWithId[] = [];

    public static getComponentInfo(): Donuts.Modularity.IComponentInfo<SfxContainer> {
        return {
            name: "page-sfx-container",
            version: electron.app.getVersion(),
            singleton: true,
            descriptor: async (http: IHttpClient) => new SfxContainer(http),
            deps: ["sfx.http"]
        };
    }

    constructor(private http: IHttpClient) {}

    public async reloadSfxAsync(targetServiceEndpoint: string): Promise<void> {
        const container = $("div.right-container");
        $("#instructions", container).hide();
        $(".view-container", container).css({ top: `${0 - container.height()}px` }).removeClass("current");
        $("webview", container).attr("tabindex", "-1");

        const id = uuidv5(targetServiceEndpoint, SfxContainer.UrlUuidNameSpace);
        const sfxWebView = <WebviewTag>document.getElementById(`view-${id}`);
        if (sfxWebView) {
            sfxWebView.reload();            
            $(`#view-container-${id}`, container).css({ top: 0 }).addClass("current");
            $("webview", $(`#view-container-${id}`, container)).attr("tabindex", "1");
        }

        return Promise.resolve();
    }

    public async loadSfxAsync(cluster: ICluster): Promise<void> {
        const container = $("div.right-container");
        $("#instructions", container).hide();
        $(".view-container", container).css({ top: `${0 - container.height()}px` }).removeClass("current");
        $("webview", container).attr("tabindex", "-1");

        const id = uuidv5(cluster.endpoint, SfxContainer.UrlUuidNameSpace);

        if (this.endpoints.find(e => e.endpoint === cluster.endpoint)) {
            $(`#view-container-${id}`, container).css({ top: 0 }).addClass("current");
            $("webview", $(`#view-container-${id}`, container)).attr("tabindex", "1");
            
            return Promise.resolve();
        }
                
        const sfxUrl = resolve({ path: "../../../sfx/index.html", search: "?targetcluster=" + cluster.endpoint });

        this.endpoints.push({ ...cluster, id: id });
        this.http.registerClusterConfiguration(cluster);

        //TODO requrest a browser view be added by RPC to something in the main thread.

        // const window = new electron.BrowserWindow({
        //     webPreferences: {
        //         preload: "./preload.js",
        //         nodeIntegration: true,
        //         webviewTag: true,
        //         contextIsolation: false,
        //     },
        // });
        
        // await window.loadURL(sfxUrl)

        // container.append(`<div id="treeview-loading-glyph" class="bowtie-icon bowtie-spinner rotate"></div>`);
        // $(`<div id="view-container-${id}" class="view-container current"><webview tabindex="1" src="${sfxUrl}" id="view-${id}" autosize="on" nodeintegration="true" preload="./preload.js" ></webview></div>`).appendTo(container);

        // const sfxWebView = <WebviewTag>document.getElementById(`view-${id}`);


        // sfxWebView.addEventListener("dom-ready", async () => {
        //     container.children("#treeview-loading-glyph").remove();
        // });

        // console.log("test");
        // sfxWebView.addEventListener("console-message", (e) => {
        //     console.log(`${sfxUrl} : `, e);
        // });

        // sfxWebView.addEventListener("new-window",
        //     (event) => {
        //     event.preventDefault();
        //     shell.start(event.url);
        // });


        return Promise.resolve();
    }

    public async unloadSfxAsync(targetServiceEndpoint: string): Promise<void> {
        const container = $("div.right-container");
        const id = uuidv5(targetServiceEndpoint, SfxContainer.UrlUuidNameSpace);
        const index = this.endpoints.findIndex(e => e.endpoint === targetServiceEndpoint);
        if (index >= 0) {
            this.endpoints.splice(index, 1);
        }

        container.children("#view-container-" + id).remove();

        if (this.endpoints.length === 0) {
            $("#instructions", container).show();
        }
    }
}

$(window).on("resize", () => {
    // Bug from Electron: when <webview> is hidden, its webcontents won't auto resize to fill the whole view when window is resizing
    // Instead of hiding the <webview> tags which are not current, pushing it out of view so it always fills the whole view
    const container = $("div.right-container");
    $(".view-container:not(.current)", container).css({ top: `${0 - container.height()}px` });
});
