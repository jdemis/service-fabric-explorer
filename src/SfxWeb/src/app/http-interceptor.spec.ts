import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { httpInterceptorProviders } from './http-interceptor';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { environment } from 'src/environments/environment';
import { AadConfigService } from './modules/msal-dynamic-config/config-service.service';
import { AadMetadata } from './Models/DataModels/Aad';
import { MsalService } from '@azure/msal-angular';
import { Observable, of } from 'rxjs';

describe('Http interceptors', () => {
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;
    const dataService: Partial<DataService> = { readOnlyHeader: null, clusterNameMetadata: 'old-name' };
    const aadConfig: Partial<AadConfigService> = {
        getCluster: () => "cluster-id",
        getAuthority: () => "authority",
        aadEnabled: false,
        metaData: new AadMetadata({
            type: 'aad',
            metadata: {
                login: 'login',
                authority: 'auth',
                client: 'client-id',
                cluster: 'cluster-id',
                redirect: 'redirect',
                tenant: 'tenant-id'
            }
        })
    };

    const msalService: Partial<MsalService> = {
        acquireTokenSilent: (resource) => {
            return of({
                authority: `https://login.microsoftonline.com/${aadConfig.metaData.raw.metadata.cluster}`,
                uniqueId: "75a43bed-7b26-4adb-8f7e-018097389324",
                tenantId: aadConfig.metaData.raw.metadata.cluster,
                scopes: [],
                account: {} as any,
                idToken: 'aad-token',
                accessToken: 'aad-token',
                idTokenClaims: {} as any,
                fromCache: true,
                tokenType: "Bearer",
                expiresOn: new Date(),
                correlationId: 'some-guid'
            })
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [httpInterceptorProviders,
                { provide: DataService, useValue: dataService },
                { provide: MsalService, useValue: msalService },
                { provide: AadConfigService, useValue: aadConfig },
              ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });


    fit('readonly enabled', async () => {
        httpClient.get('/test').subscribe();

        const request = httpMock.expectOne('/test');

        const headers = {
            'SFX-Readonly': '1',
            'SFX-ClusterName': 'test-cluster'
        };
        request.flush(null, { headers });

        expect(dataService.readOnlyHeader).toBeTruthy();
        expect(dataService.clusterNameMetadata).toBe('test-cluster');
    });

    fit('SFRP headers lowercase', async () => {
      httpClient.get('/test').subscribe();

      const request = httpMock.expectOne('/test');

      const headers = {
          'sfx-readonly': '1',
          'sfx-clustername': 'test-cluster'
      };
      request.flush(null, { headers });

      expect(dataService.readOnlyHeader).toBeTruthy();
      expect(dataService.clusterNameMetadata).toBe('test-cluster');
  });

    fit('readonly off', async () => {
        httpClient.get('/test').subscribe();

        const request = httpMock.expectOne('/test');

        const headers = { 'SFX-Readonly': '0' };
        request.flush(null, { headers });

        expect(dataService.readOnlyHeader).toBeFalsy();
    });

    fit('client headers sent', async () => {
        httpClient.get('/test').subscribe();

        const requests = httpMock.match({ method: 'get' });
        expect(requests[0].request.headers.get('x-servicefabricclienttype')).toBe('SFX');
        expect(requests[0].request.headers.get('sfx-build')).toBe(environment.version);
    });

    fit('aad auth not enabled', async () => {
        aadConfig.aadEnabled = false;

        httpClient.get('/test').subscribe();

        const requests = httpMock.match({ method: 'get' });
        expect(requests[0].request.headers.get('Authorization')).toBeNull();
    });

    fit('aad auth enabled', async () => {
        aadConfig.aadEnabled = true;

        httpClient.get('/test').subscribe();

        const requests = httpMock.match({ method: 'get' });
        expect(requests[0].request.headers.get('Authorization')).toBe('Bearer aad-token');
    });
});
