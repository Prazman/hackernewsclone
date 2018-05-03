<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

class Link extends Model
{
    protected $fillable = ['title', 'link'];
    protected $attributes = array(
   'upvote_count' => 0,
);
}
