
// This program is a Rust implementation of our existing insult model generator - generate.py.

use clap::Parser;
use std::fs::File;
use std::io::{BufRead, BufReader};

use regex::Regex;

#[macro_use]
extern crate json;

use tikv_jemallocator::Jemalloc;

#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

/// A Shakespearian insult generator
#[derive(Parser, Debug)]
#[clap(version)]
struct Args {
    /// the number of insults to generate
    #[clap(short = 'c', long, default_value_t = 0)]
    count: i32,

    /// the location of the phrases source file
    #[clap(short, long, default_value = "data/phrases")]
    phrases: String,

    /// the destination file, if any, for the generated insults
    #[clap(short, long, default_value = "")]
    genfile: String,

    /// the format for the generated insults (text or json)
    ///
    /// if not provided, the default is "json"
    #[clap(short, long, default_value = "json")]
    format: String,
}

fn readlines(path: &str) -> Vec<Vec<String>> {
    let fp = File::open(path).unwrap();
    let mut reader = BufReader::new(fp);

    let mut results: Vec<Vec<String>> = Vec::new();
    let re = Regex::new("[\t]+").unwrap();

    let mut line = String::new();

    loop {
        let nbytes = reader.read_line(&mut line).expect(&format!("failed to read from file: {}", path));

        if nbytes == 0 {
            break;
        }

        let fields: Vec<String> = re.split(&line)
            .map(|s| s.trim())
            .map(|s| s.to_string())
            .collect();

        results.push(fields);
        
        line.clear();
    }

    results
}

fn insult_me(phrases: &json::JsonValue, ninsults: i32) {
    for _i in 0..ninsults {
        for keywords in phrases.members() {
            println!("Thou {} {} {}!", keywords[0], keywords[1], keywords[2]);
        }
    }

}

fn load_phrases(phrases: String) -> json::JsonValue {
    let data = readlines(&phrases);
    let phrases = object!{
        "phrases": data
    };

    phrases
}

fn main() {
    let args = Args::parse();

    let phrases = load_phrases(args.phrases);
    
    println!("{:#}", phrases);

    let ninsults: i32 = if args.count > 0 {
        i32::from(args.count)
    } else {
        i32::from(1)
    };

    insult_me(&phrases, ninsults);
}
