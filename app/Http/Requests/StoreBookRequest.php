<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'pages_num' => 'required|integer',
            'publish_year' => 'required|integer|between:1000,2050',
            'publisher_id' => [
                'required',
                Rule::exists('publishers', 'id')
            ]
        ];
    }
}
