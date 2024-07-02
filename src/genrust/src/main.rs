
// This program is a Rust implementation of our existing insult model generator - generate.py.

use clap::Parser;

use tikv_jemallocator::Jemalloc;

#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

/// A Shakespearian insult generator
#[derive(Parser, Debug)]
#[clap(version)]
struct Args {
    /// the number of insults to generate
    #[clap(short = 'c', long, default_value_t = 0)]
    count: usize,

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

fn main() {
    let args = Args::parse();

    dbg!(args);
}
