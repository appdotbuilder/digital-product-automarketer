<?php

namespace App\Services;

use App\Models\Member;
use App\Models\Reseller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    /**
     * Send welcome notifications to a new member.
     */
    public function sendWelcomeNotifications(Member $member): void
    {
        $this->sendWelcomeEmail($member);
        $this->sendWhatsAppMessage($member->whatsapp_number, $this->getWelcomeWhatsAppMessage($member));
    }

    /**
     * Notify reseller of new referral.
     */
    public function notifyResellerOfNewReferral(Member $member): void
    {
        if (!$member->referrer_code) {
            return;
        }

        $reseller = Reseller::where('unique_code', $member->referrer_code)->first();
        
        if (!$reseller) {
            return;
        }

        $this->sendResellerNotificationEmail($reseller, $member);
        $this->sendWhatsAppMessage(
            $reseller->whatsapp_number, 
            $this->getResellerNotificationWhatsAppMessage($reseller, $member)
        );
    }

    /**
     * Send welcome email to member.
     */
    protected function sendWelcomeEmail(Member $member): void
    {
        try {
            // In a real implementation, you would use Laravel's Mail facade
            // Mail::to($member->email)->send(new WelcomeMail($member));
            
            Log::info("Welcome email sent to: {$member->email}");
        } catch (\Exception $e) {
            Log::error("Failed to send welcome email to {$member->email}: " . $e->getMessage());
        }
    }

    /**
     * Send WhatsApp message.
     */
    protected function sendWhatsAppMessage(string $number, string $message): void
    {
        try {
            // In a real implementation, you would integrate with WhatsApp Business API
            // or a service like Twilio WhatsApp API
            
            Log::info("WhatsApp message sent to: {$number}", ['message' => $message]);
        } catch (\Exception $e) {
            Log::error("Failed to send WhatsApp message to {$number}: " . $e->getMessage());
        }
    }

    /**
     * Send notification email to reseller.
     */
    protected function sendResellerNotificationEmail(Reseller $reseller, Member $member): void
    {
        try {
            Log::info("Reseller notification email sent to: {$reseller->email}");
        } catch (\Exception $e) {
            Log::error("Failed to send reseller notification to {$reseller->email}: " . $e->getMessage());
        }
    }

    /**
     * Get welcome WhatsApp message for member.
     */
    protected function getWelcomeWhatsAppMessage(Member $member): string
    {
        return "🎉 Welcome to our Digital Products Platform, {$member->full_name}!\n\n" .
               "Thank you for registering with us. You now have access to our premium digital products.\n\n" .
               "📧 Account Details:\n" .
               "Email: {$member->email}\n" .
               "Registration Date: " . $member->created_at->format('M d, Y') . "\n\n" .
               "🛍️ Browse our products and start your digital journey today!\n\n" .
               "Need help? Reply to this message or contact our support team.";
    }

    /**
     * Get reseller notification WhatsApp message.
     */
    protected function getResellerNotificationWhatsAppMessage(Reseller $reseller, Member $member): string
    {
        return "🎯 New Referral Alert!\n\n" .
               "Hi {$reseller->name},\n\n" .
               "Great news! A new member has registered through your referral link:\n\n" .
               "👤 Member: {$member->full_name}\n" .
               "📧 Email: {$member->email}\n" .
               "📅 Registered: " . $member->created_at->format('M d, Y H:i') . "\n\n" .
               "💰 Keep up the great work! Your referral earnings are growing.\n\n" .
               "View your dashboard for more details.";
    }
}