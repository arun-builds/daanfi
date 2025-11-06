#![allow(unexpected_cfgs, deprecated)]
use anchor_lang::prelude::*;

pub mod states;
pub mod handlers;
mod errors;
mod constants;

use handlers::*;
use states::Milestone;

declare_id!("3ZZcUfMdaP6wZmBxbjFqJnFjtua4QwsuQov23hmoVW6L");

#[program]
pub mod basic {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        handlers::init(ctx)?;
        Ok(())
    }

    pub fn create_campaign(ctx: Context<CreateCampaign>, id: u64, total_amount: u64, milestones: Vec<Milestone>, beneficiary: Pubkey, title: String, description: String) -> Result<()> {
        handlers::create_campaign(ctx, id, total_amount, milestones, beneficiary, title, description)?;
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        handlers::donate(ctx, amount)?;
        Ok(())
    }

    pub fn record_vote(ctx: Context<RecordVote>, milestone_index: u8, is_agreed: bool) -> Result<()> {
        handlers::record_vote(ctx, milestone_index, is_agreed)?;
        Ok(())
    }
}
