
// This program is a Rust implementation of our existing insult model generator - generate.py.

use clap::Parser;
use std::fs::read_to_string;

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

fn readlines(path: &str) -> u32 {
    let data = read_to_string(path).unwrap();
    let lines = data.lines();

    for line in lines {
        let tuple = line.split("\t");
        let dataset = tuple.collect::<Vec<&str>>();

        dbg!(&dataset);
    }

    return 42
}

fn insult_me(ninsults: i32, nphrases: i32) {
    dbg!(ninsults);
    dbg!(nphrases);
}

fn load_phrases(phrases: String, _urls: String) -> i32 {
    let data = readlines(&phrases);

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
