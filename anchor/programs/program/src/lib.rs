#![allow(unexpected_cfgs, deprecated)]
use anchor_lang::prelude::*;

pub mod states;
pub mod handlers;

use handlers::*;


declare_id!("3ZZcUfMdaP6wZmBxbjFqJnFjtua4QwsuQov23hmoVW6L");

#[program]
pub mod basic {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::init(ctx)?;
        Ok(())
    }
}
