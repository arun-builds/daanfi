use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace)]
pub struct Campaign {
    pub id: u64,
    pub sponsor: Pubkey,
    pub total_amount: u64,
    #[max_len(10)] // max 10 milestones
    pub milestones: Vec<Milestone>,
    pub created_at: i64,
    pub updated_at: i64,
}

#[derive(AnchorDeserialize, AnchorSerialize,Clone,InitSpace)]
pub struct Milestone {
    pub id: u64,
    pub amount: u64,
    pub order: u8, // order of the milestone
    pub is_completed: bool,
    pub completed_at: i64,
}
