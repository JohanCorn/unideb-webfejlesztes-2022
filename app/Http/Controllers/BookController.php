<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $publisher = $request->input('publisher');
        $authors = $request->input('authors');

        $books = Book::query()
            ->when($publisher, fn($q) => $q->with('publisher'))
            ->when($authors, fn($q) => $q->with('authors'))
            ->get();

        return response($books);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreBookRequest $request
     * @return Response
     */
    public function store(StoreBookRequest $request): Response
    {
        $book = new Book();
        $book->fill($request->validated());
        $book->save();

        return response($book, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param Book $book
     * @return Response
     */
    public function show(Request $request, Book $book): Response
    {
        $publisher = $request->input('publisher');
        $authors = $request->input('authors');

        $book = Book::query()
            ->when($publisher, fn($q) => $q->with('publisher'))
            ->when($authors, fn($q) => $q->with('authors'))
            ->where('id', $book->id)
            ->first();

        return response($book);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateBookRequest $request
     * @param Book $book
     * @return Response
     */
    public function update(UpdateBookRequest $request, Book $book): Response
    {
        $book->fill($request->validated());
        $book->save();

        return response($book);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Book $book
     * @return Response
     */
    public function destroy(Book $book): Response
    {
        $book->delete();

        return abort(204);
    }
}
