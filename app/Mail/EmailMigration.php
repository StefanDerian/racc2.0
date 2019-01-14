<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class EmailMigration extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $content;

    public $migration_data;


    public function __construct($content,$migration_data)
    {
        $this->content = $content;
        $this->migration_data = $migration_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.migration')->with([
          'content' => $this->content,
          'migration_data'=> $this->migration_data
        ]);
    }
}
