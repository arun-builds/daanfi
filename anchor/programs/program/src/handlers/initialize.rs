use crate::states::Config;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        payer = payer,
        space = Config::DISCRIMINATOR.len() + Config::INIT_SPACE,
        seeds = [b"config"],
        bump,
        
    )]
    pub config: Account<'info, Config>,

    #[account(
        mut,
        seeds = [b"treasury", config.key().as_ref()],
        bump,
    )]
    pub treasury: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn init(
    context: Context<Initialize>,

) -> Result<()> {
    context.accounts.config.set_inner(Config {
        is_graduated: false,
         graduated_at: 0,
          treasury_bump: context.bumps.treasury,
           config_bump: context.bumps.config,
            
             });
    Ok(())
}
