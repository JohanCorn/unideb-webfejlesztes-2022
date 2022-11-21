<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $books = $request->input('books');
        $books_publisher = $request->input('books_publisher');

        $authors = Author::query()
            ->when($books, fn($q) => $q->with('books'))
            ->when($books_publisher, fn($q) => $q->with('books.publisher'))
            ->get();

        return response($authors);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreAuthorRequest $request
     * @return Response
     */
    public function store(StoreAuthorRequest $request): Response
    {
        $author = new Author();
        $author->fill($request->validated());
        $author->save();

        return response($author, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param Author $author
     * @return Response
     */
    public function show(Request $request, Author $author): Response
    {
        $books = $request->input('books');
        $books_publisher = $request->input('books_publisher');

        $author = Author::query()
            ->when($books, fn($q) => $q->with('books'))
            ->when($books_publisher, fn($q) => $q->with('books.publisher'))
            ->where('id', $author->id)
            ->first();

        return response($author);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateAuthorRequest $request
     * @param Author $author
     * @return Response
     */
    public function update(UpdateAuthorRequest $request, Author $author): Response
    {
        $author->fill($request->validated());
        $author->save();

        return response($author);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Author $author
     * @return Response
     */
    public function destroy(Author $author): Response
    {
        $author->delete();

        return abort(204);
    }
}
