use anchor_lang::prelude::*;

use crate::states::{Campaign, GovernanceConfig, Milestone};
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct CreateCampaign<'info> {
    #[account(mut)]
    pub sponsor: Signer<'info>,
    #[account(
        mut,
        seeds = [b"config"],
        bump = config.config_bump,
    )]
    pub config: Account<'info, GovernanceConfig>,
    #[account(
        init,
        payer = sponsor,
        space = Campaign::DISCRIMINATOR.len() + Campaign::INIT_SPACE,
        seeds = [b"campaign", config.key().as_ref(), sponsor.key().as_ref()],
        bump,
    )]
    pub campaign: Account<'info, Campaign>,
    pub system_program: Program<'info, System>,
}

pub fn create_campaign(context: Context<CreateCampaign>, id: u64, total_amount: u64, milestones: Vec<Milestone>) -> Result<()> {

    require!(total_amount > 0, ErrorCode::InvalidTotalAmount);

    let now = Clock::get()?.unix_timestamp;
    let mut amount_to_check = 0;

        for milestone in milestones.iter() {
            amount_to_check += milestone.amount;
    }
    require!(
        amount_to_check == total_amount,
        ErrorCode::InvalidMilestoneAmount
     );

    context.accounts.campaign.set_inner(Campaign {
        id,
        sponsor: context.accounts.sponsor.key(),
        total_amount,
        milestones,
        created_at: now,
        updated_at: now,
    });
    Ok(())
}
