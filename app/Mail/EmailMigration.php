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
    public $from;
    public $content;
    public $to;
    public $migration_data;


    public function __construct($from,$content,$to,$migration_data)
    {
        //
        $this->from = $from;
        $this->to = $to;
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
          'from'=>$this->from,
          'to' => $this->to,
          'content' => $this->content,
          'migration_data'=> $this->migration_data
        ]);
    }
}
