<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function registration(RegistrationRequest $request): Response
    {
        $user = new User();
        $user->fill($request->validated());
        $user->save();

        $accessToken = $user->createToken('Auth Registration')->plainTextToken;

        return response(['user' => $user, 'access_token' => $accessToken]);
    }

    public function login(LoginRequest $request): Response
    {
        $inputs = $request->validated();

        if (!Auth::attempt($inputs)) {
            return abort(401);
        }

        $user = $request->user();
        $accessToken = $user->createToken('Auth Registration')->plainTextToken;

        return response(['user' => $user, 'access_token' => $accessToken]);
    }

    public function logout(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();

        return abort(204);
    }
}
