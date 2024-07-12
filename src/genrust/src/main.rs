
// This program is a Rust implementation of our existing insult model generator - generate.py.

// This was really just an exercise in writing a non-trivial Rust program; to understand the
// language's overall syntax, and the dreaded Borrow Checker. Compare this code to the Python
// version, and you'll see it's roughly the same length. So that's cool. IMHO, Rust's downfall
// is its memory management approach/implementation: borrowing and the borrow checker. It's often
// not obvious at all who owns what, and why the borrow checker refuses to accept a certain construct.
// Glancing over code while working on a specific issue, one must analyze what the borrow checker is
// doing, and why declarations were declared a certain way. That really, really gets in the way and is
// counterproductive. Overall, however, I like Rust ok. It's generally nice to write I suppose, but Rust
// still reflects the newer class of strongly typed languages that clutter the code with messy syntax,
// annotations, obscure behavior and the same old block-structured design. If anything, I'd say Rust is
// much nicer than Swift, which is horribly clumsy and verbose. But nothing exciting to see here.

// I would still choose ANSI C over Rust for system software, along with Emacs, GNU gdb, and Make.

use clap::Parser;
use std::fs::File;
use std::io::{BufRead, BufReader, Write};
use std::process;

use rand::prelude::*;

use regex::Regex;

use serde_json::json;

use tikv_jemallocator::Jemalloc;

#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

type JsonDoc = serde_json::Value;

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
#[command(about = "A Shakespearean insult generator")]
struct Args {
    /// the number of insults to generate
    ///
    /// if not provided, the default is 1
    #[clap(short = 'c', long, default_value_t = 1)]
    #[arg(value_parser = clap::value_parser!(u16).range(1..=500))]
    count: u16,

    /// the location of the phrases source file
    ///
    /// if not provided, the default is "data/phrases"
    #[clap(short, long, default_value = "data/phrases")]
    phrases: String,

    /// generate a complete set of insults, in JSON, and write them to GENFILE
    ///
    /// if not provided, insults go to stdout
    #[clap(short, long, default_value = "")]
    genfile: String,
}

fn readlines(path: &str) -> Vec<Vec<String>> {
    let fp = match File::open(path) {
        Err(e) => {
            println!("failed to open file: {path}: {e}");
            process::exit(-1);
        },
        Ok(fp) => fp
    };

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

fn canonicalize(s: &String) -> String {
    return s.trim_matches(|c| c == '\"' || c == '\'').to_string();
}

fn insult_me(phrases: &serde_json::Value, ninsults: i32) {
    let mut i = 0;
    let mut rng = thread_rng();
    
    if let serde_json::Value::Array(tuples) = &phrases["phrases"] {
        let len = tuples.len();

        while i < ninsults {
            let range = std::ops::Range {start: 0, end: len - 1};
            let index = rng.gen_range(range);
            let entry = &tuples[index];

            let c1 = canonicalize(&entry[0].to_string());
            let c2 = canonicalize(&entry[1].to_string());
            let c3 = canonicalize(&entry[2].to_string());

            println!("Thou {} {} {}!", c1, c2, c3);

            i += 1;
        }
    }
}

fn generate_insults(phrases: &JsonDoc, genfile: &str) {
    let mut fp = match File::create(genfile) {
        Err(e) => {
            println!("failed to create file: {genfile}: {e}");
            process::exit(-1);
        },
        Ok(fp) => fp
    };

    if let serde_json::Value::Array(tuples) = &phrases["phrases"] {
        let payload = json!({
            "phrases": &tuples
        });
        
        let doc = serde_json::to_string_pretty(&payload).unwrap();
        let buf = doc.as_bytes();

        fp.write_all(buf).unwrap();
    }
}

fn load_phrases(phrases: String) -> serde_json::Value {
    let data = readlines(&phrases);

    json!({
        "phrases": data
    })
}

fn main() {
    let args = Args::parse();

    let phrases = load_phrases(args.phrases);
    let ninsults: i32 = i32::from(args.count);

    if args.genfile.len() > 0 {
        generate_insults(&phrases, &args.genfile);
    } else {
        insult_me(&phrases, ninsults);
    }

    process::exit(0);
}
