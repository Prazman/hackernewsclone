<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

class Comment extends Model
{
    protected $fillable = ['content', 'link_id'];
}
