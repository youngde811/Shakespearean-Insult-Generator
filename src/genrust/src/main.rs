
// This program is a Rust implementation of our existing insult model generator - generate.py.

use clap::Parser;

use tikv_jemallocator::Jemalloc;

#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

#[derive(Parser, Debug)]
struct Args {
    #[clap(short, long, default_value_t = 0)]
    count: usize,

    #[clap(short, long, default_value = "data/phrases")]
    phrases: String,

    #[clap(short, long, default_value = "")]
    genfile: String,

    #[clap(short, long, default_value = "json")]
    format: String,

    #[clap(short, long, default_value = "data/urls.json")]
    urls: String
}

fn main() {
    let args = Args::parse();

    dbg!(args);
}
