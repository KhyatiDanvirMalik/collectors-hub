import type { Listing, Post } from '../types';
import { listings } from './listings';
import { posts } from './posts';

/**
 * Simulated backend layer.
 *
 * In a real app these functions would be `fetch(...)` calls to a JSON
 * server or REST API. Here we simulate network latency and an occasional
 * failure so the UI's loading / error states are genuinely exercised,
 * as the assignment asks for.
 */

const NETWORK_DELAY_MS = 600;

// Set to a small probability so errors are visible sometimes without
// making the app hard to demo. Change to 0 to disable entirely.
const FAILURE_RATE = 0.06;

function delay<T>(value: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function maybeFail(context: string) {
  if (Math.random() < FAILURE_RATE) {
    throw new Error(`Failed to load ${context}. Please try again.`);
  }
}

export async function fetchListings(): Promise<Listing[]> {
  await delay(null);
  maybeFail('marketplace listings');
  return listings;
}

export async function fetchListingById(id: string): Promise<Listing | undefined> {
  await delay(null, 400);
  maybeFail('product details');
  return listings.find((l) => l.id === id);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(null);
  maybeFail('community feed');
  return posts;
}

export async function fetchPostById(id: string): Promise<Post | undefined> {
  await delay(null, 400);
  maybeFail('post details');
  return posts.find((p) => p.id === id);
}
