#![allow(unexpected_cfgs, deprecated)]
use anchor_lang::prelude::*;

pub mod states;
pub mod handlers;

use handlers::*;


declare_id!("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

#[program]
pub mod basic {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::init(ctx)?;
        Ok(())
    }
}
