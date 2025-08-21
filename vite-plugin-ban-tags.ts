import type { Plugin } from 'vite';


const fileRegex: RegExp = /!\/\.(ts|tsx|js|jsx)$\// /* Note: Might be an issue with node_modules since it isn't ignored when transforming */
const aCodeRegex: RegExp = /jsx(?:DEV)?\(\s*["']a["']/;
const banList: RegExp[] = [aCodeRegex];

export default function banTagsPlugin(): Plugin {
    return {
        name: "no-a-tag-plugin",
        transform(code: string, id: string) {
            if(fileRegex.test(id)) return;
            
            for(const item of banList) {
                if(item.test(code)){
                    throw new Error(`No <a> tags allowed in ${id}. Use the damn sitemap!`)
                }
            }   
            return null;
        }
    };
}