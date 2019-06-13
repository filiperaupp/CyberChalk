<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Comment;
use App\User;
use Log;

class CommentController extends Controller
{
    public function store(Request $request){
        $user = Auth::user();
        $newComment = new Comment();

        $newComment->user_id = $user->id;
        $newComment->content_solicitation_id = $request->content_id;
        $newComment->text = $request->text;
        $newComment->save();
        return json_encode('ok',200);
    }

    public function update(Request $request, $id){
        $comment = Comment::find($id);

        if (isset($comment)) {
            $comment->text = $request->text;
            $comment->save();
            return json_encode('ok', 200);
        }
        return json_encode('not found', 404);
    }

    public function getCommentsByContent($idContent){
        $allComments = Comment::where('content_solicitation_id', $idContent)->get();

        $comments = array();
        if (isset($allComments) && sizeOf($allComments) > 0) {
            foreach ($allComments as $comment) {
                $comment->user = User::select('id','name','profile_photo')->where('id',$comment->user_id)->first();
                array_push($comments, $comment);
            }
        }
        return $comments;
    }

    public function destroy($id){
        $comment = Comment::find($id);

        if (isset($comment)) {
            $comment->delete();
            return json_encode('ok', 200);
        }
        return json_encode('not found', 404);
    }
}
