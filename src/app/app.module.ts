import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {RippleModule} from "primeng/ripple";
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from "primeng/table";
import {SkeletonModule} from 'primeng/skeleton';
import {DialogModule} from 'primeng/dialog';
import {ListboxModule} from 'primeng/listbox';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ImageModule} from 'primeng/image';
import {DataViewModule} from 'primeng/dataview';
import {CardModule} from "primeng/card";
import {InputTextareaModule} from 'primeng/inputtextarea';

import {MenubarComponent} from './components/menu/menubar/menubar.component';
import {RegistrationPageComponent} from './components/page/registration/registration.component';
import {LoginPageComponent} from './components/page/login/login.component';
import {HomePageComponent} from './components/page/home/home.component';
import {PublishersPageComponent} from './components/page/publishers/publishers.component';
import {PublisherPageComponent} from './components/page/publisher/publisher.component';
import {PublishersTableComponent} from './components/table/publishers/publishers.component';
import {CreatePublisherComponent} from "./components/create/publisher/publisher.component";
import {UpdatePublisherComponent} from './components/update/publisher/publisher.component';
import {DeletePublisherComponent} from './components/delete/publisher/publisher.component';
import {BookPageComponent} from './components/page/book/book.component';
import {BooksPageComponent} from './components/page/books/books.component';
import {BooksTableComponent} from './components/table/books/books.component';
import {CreateBookComponent} from "./components/create/book/book.component";
import {UpdateBookComponent} from './components/update/book/book.component';
import {DeleteBookComponent} from "./components/delete/book/book.component";
import {AuthorsPageComponent} from './components/page/authors/authors.component';
import {AuthorPageComponent} from './components/page/author/author.component';
import {AuthorsTableComponent} from "./components/table/authors/authors.component";
import {CreateAuthorComponent} from "./components/create/author/author.component";
import {UpdateAuthorComponent} from "./components/update/author/author.component";
import {DeleteAuthorComponent} from "./components/delete/author/author.component";

const primeModules = [
  RippleModule,
  InputTextModule,
  ButtonModule,
  ToastModule,
  MenubarModule,
  TableModule,
  SkeletonModule,
  DialogModule,
  MessagesModule,
  MessageModule,
  ListboxModule,
  ScrollPanelModule,
  ImageModule,
  DataViewModule,
  CardModule,
  InputTextareaModule
];

const publisherComponents = [
  PublishersPageComponent,
  PublisherPageComponent,
  PublishersTableComponent,
  CreatePublisherComponent,
  UpdatePublisherComponent,
  DeletePublisherComponent
];

const bookComponents = [
  BooksPageComponent,
  BookPageComponent,
  BooksTableComponent,
  CreateBookComponent,
  UpdateBookComponent,
  DeleteBookComponent
];

const authorComponents = [
  AuthorsPageComponent,
  AuthorPageComponent,
  AuthorsTableComponent,
  CreateAuthorComponent,
  UpdateAuthorComponent,
  DeleteAuthorComponent
];

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    ...publisherComponents,
    ...bookComponents,
    ...authorComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ...primeModules
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
