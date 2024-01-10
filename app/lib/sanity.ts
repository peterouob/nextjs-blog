import {createClient} from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
export const client = createClient({
    apiVersion: '2024-01-10',
    dataset: 'production',
    projectId: '4c3i6con',
    useCdn: false,

})

const builder = imageUrlBuilder(client)
export function urlFor(source:any){
    return builder.image(source)
}