import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: MainLayoutComponent,

        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/home/home.component')
                        .then(m => m.HomeComponent)
            },
        ]
    }
];