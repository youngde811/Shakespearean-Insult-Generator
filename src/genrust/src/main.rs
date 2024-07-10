
// This program is a Rust implementation of our existing insult model generator - generate.py.

use clap::Parser;
use std::fs::File;
use std::io::{BufRead, BufReader};

use regex::Regex;

use serde_json::json;

use tikv_jemallocator::Jemalloc;

#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

/// A Shakespearian insult generator
#[derive(Parser, Debug)]
#[clap(version)]
struct Args {
    /// the number of insults to generate
    #[clap(short = 'c', long, default_value_t = 1)]
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

fn insult_me(phrases: &serde_json::Value, ninsults: i32) {
    let mut i = 0;

    while i < ninsults {
        if let serde_json::Value::Array(tuples) = &phrases["phrases"] {
            for entry in tuples {
                let c1 = &entry[0].to_string().trim_matches(|c| c == '\"' || c == '\'').to_string();
                let c2 = &entry[1].to_string().trim_matches(|c| c == '\"' || c == '\'').to_string();
                let c3 = &entry[2].to_string().trim_matches(|c| c == '\"' || c == '\'').to_string();

                println!("Thou {} {} {}!", c1, c2, c3);
            }

            i += 1;
        }
    }
}

fn load_phrases(phrases: String) -> serde_json::Value {
    let data = readlines(&phrases);
    let phrases = json!({
        "phrases": data
    });

    phrases
}

fn main() {
    let args = Args::parse();

    let phrases = load_phrases(args.phrases);

    let ninsults: i32 = if args.count > 0 {
        i32::from(args.count)
    } else {
        i32::from(1)
    };

    insult_me(&phrases, ninsults);
}
