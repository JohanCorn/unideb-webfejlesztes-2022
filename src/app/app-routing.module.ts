import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestGuard} from "./guards/guest.guard";
import {AuthGuard} from "./guards/auth.guard";
import {RegistrationPageComponent} from './components/page/registration/registration.component';
import {LoginPageComponent} from "./components/page/login/login.component";
import {HomePageComponent} from "./components/page/home/home.component";
import {PublishersPageComponent} from "./components/page/publishers/publishers.component";
import {PublisherPageComponent} from "./components/page/publisher/publisher.component";
import {BooksPageComponent} from "./components/page/books/books.component";
import {BookPageComponent} from "./components/page/book/book.component";
import {AuthorsPageComponent} from "./components/page/authors/authors.component";
import {AuthorPageComponent} from "./components/page/author/author.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'books/:id',
    component: BookPageComponent
  },
  {
    path: 'books',
    component: BooksPageComponent
  },
  {
    path: 'authors/:id',
    component: AuthorPageComponent
  },
  {
    path: 'authors',
    component: AuthorsPageComponent
  },
  {
    path: 'publishers/:id',
    component: PublisherPageComponent
  },
  {
    path: 'publishers',
    component: PublishersPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
