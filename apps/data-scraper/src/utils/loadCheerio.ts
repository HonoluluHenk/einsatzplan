import * as cheerio from 'cheerio';
import { type AnyNode } from 'domhandler';

export function loadCheerio(html: string | AnyNode | AnyNode[] | Buffer): cheerio.CheerioAPI {
  return cheerio.load(html, {xml: {xmlMode: false}});
}

export function loadCheerioFragment(html: string | AnyNode | AnyNode[] | Buffer): cheerio.CheerioAPI {
  return cheerio.load(html, {xml: {xmlMode: false}}, false);

}
