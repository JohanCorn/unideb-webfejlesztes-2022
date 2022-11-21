<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests\StorePublisherRequest;
use App\Http\Requests\UpdatePublisherRequest;
use App\Models\Publisher;

class PublisherController extends Controller
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
        $booksAuthors = $request->input('books_authors');

        $publishers = Publisher::query()
            ->when($books, fn($q) => $q->with('books'))
            ->when($booksAuthors, fn($q) => $q->with('books.authors'))
            ->get();

        return response($publishers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StorePublisherRequest $request
     * @return Response
     */
    public function store(StorePublisherRequest $request): Response
    {
        $publisher = new Publisher();
        $publisher->fill($request->validated());
        $publisher->save();

        return response($publisher, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param Publisher $publisher
     * @return Response
     */
    public function show(Request $request, Publisher $publisher): Response
    {
        $books = $request->input('books');
        $booksAuthors = $request->input('books_authors');

        $publisher = Publisher::query()
            ->when($books, fn($q) => $q->with('books'))
            ->when($booksAuthors, fn($q) => $q->with('books.authors'))
            ->where('id', $publisher->id)
            ->first();

        return response($publisher);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdatePublisherRequest $request
     * @param Publisher $publisher
     * @return Response
     */
    public function update(UpdatePublisherRequest $request, Publisher $publisher): Response
    {
        $publisher->fill($request->validated());
        $publisher->save();

        return response($publisher);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Publisher $publisher
     * @return Response
     */
    public function destroy(Publisher $publisher): Response
    {
        $publisher->delete();

        return abort(204);
    }
}
