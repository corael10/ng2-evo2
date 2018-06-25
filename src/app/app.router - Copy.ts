import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth-guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', component: AppComponent,canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'login'}
]

export const routing = RouterModule.forRoot(appRoutes);