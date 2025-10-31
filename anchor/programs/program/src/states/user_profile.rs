use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct UserProfile {
    pub id: Pubkey,
    pub authority: Pubkey,
    pub total_donated_u64: u64,     // Stores total donations
    pub last_donation_amount: u64, 
    pub reputation_score: u16,
}