
use std::io;
use std::io::Write;

// This program is a Rust implementation of our existing insult model generator - generate.py.

use std::cmp::Ordering;
use rand::Rng;
use clap::Parser;

use tikv_jemallocator::Jemalloc;

#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

fn main() {
    let secret = rand::thread_rng().gen_range(1..=100);

    println!("Secret: {secret}");

    loop {
        print!("Guess: ");

        io::stdout().flush().unwrap();
        
        let mut guess = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(val) => val,
            Err(_) => continue,
        };

        println!("Guess is: {guess}");

        match guess.cmp(&secret) {
            Ordering::Less => println!("Too small"),
            Ordering::Greater => println!("Too large"),
            Ordering::Equal => {
                println!("Matched");
                break;
            }
        }
    }
}
