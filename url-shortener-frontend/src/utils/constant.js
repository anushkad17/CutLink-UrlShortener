import AppRouter, { SubDomainRouter } from '../AppRouter';

export const subDomainList = [
  { main: true, app: AppRouter, subdomain: "" },
  { main: false, app: SubDomainRouter, subdomain: "s" }
];
