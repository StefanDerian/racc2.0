<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Education;



class EducationController extends Controller
{
    //
    public function index()
    {
        return Education::all();
    }

    public function show($id)
    {
        return Education::find($id);
    }

    public function store(Request $request)
    {
        return Education::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $education = Education::findOrFail($id);
        $education->update($request->all());

        return $education;
    }

    public function delete(Request $request, $id)
    {
        $education = Education::findOrFail($id);
        $education->delete();

        return 204;
    }
}
