import { Command } from "../command";
import { hi } from "./hi.js";
import { getMeme } from "./get-meme.js";
import { genericMeme } from "./generic-meme.js";
import { customMeme } from "./custom-meme";

export const Commands: Command[] = [hi, getMeme, genericMeme, customMeme];
