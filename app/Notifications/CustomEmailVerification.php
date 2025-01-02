<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CustomEmailVerification extends Notification
{
    use Queueable;
    private $code;
    
    /**
     * Create a new notification instance.
     */

    public function __construct($code)
    {
        $this->code = $code;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['mail'];
    }
    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Verify Your Email Address - Meals on Wheels')
            ->greeting('Hello!')
            ->line('Welcome to Meals on Wheels! We\'re excited to have you on board.')
            ->line('Your verification code is:')
            ->line('' . $this->code . '')
            ->line('This code will expire in 60 minutes.')
            ->line('If you didn\'t create an account, no further action is required.')
            ->salutation('Best regards,<br>The Meals on Wheels Team');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
