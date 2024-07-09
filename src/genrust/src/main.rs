
// This program is a Rust implementation of our existing insult model generator - generate.py.

use clap::Parser;
use std::fs::File;
use std::io::{BufRead, BufReader};

use regex::Regex;

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

    /// the location of the URLs source file
    #[clap(short, long, default_value = "data/urls.json")]
    urls: String
}

fn readlines(path: &str) -> i32 {
    let fp = File::open(path).unwrap();
    let mut reader = BufReader::new(fp);

    let re = Regex::new("[\t]+").unwrap();
    let mut line = String::new();

    loop {
        let nbytes = reader.read_line(&mut line).unwrap();

        if nbytes == 0 {
            break;
        }

        let fields: Vec<&str> = re.split(&line).collect();

        let a = fields[0];
        let b = fields[1];
        let c = fields[2];
        
        println!("Fields:");
        println!("  {a} {b} {c}");

        let parts: Vec<_> = line.split("\t").collect();

        let a = parts[0];
        let b = parts[1];
        let c = parts[2];

        println!("Parts:");
        println!("  {a} {b} {c}");

        line.clear();
    }

    /*
    for line in contents {
        let tuple = line.split("\t").clone();
        let dataset = tuple.collect::<Vec<&str>>();

        rval.push(dataset.clone());
        
        dbg!(&dataset);
    }
    */

    42
}

fn insult_me(ninsults: i32, nphrases: i32) {
    dbg!(ninsults);
    dbg!(nphrases);
}

fn load_phrases(phrases: String, _urls: String) -> i32 {
    let data = readlines(&phrases);

    dbg!(data);

    42
}

fn main() {
    let args = Args::parse();

    let nphrases = load_phrases(args.phrases, args.urls);
    let ninsults: i32 = if args.count > 0 {
        i32::from(args.count)
    } else {
        i32::from(1)
    };

    insult_me(ninsults, nphrases);
}
