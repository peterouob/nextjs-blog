import {client, urlFor} from "@/app/lib/sanity";
import {fullBlog} from "@/app/lib/interface";
import Image from "next/image";
import {PortableText} from "@portabletext/react";

async function getData(slug : string){
    const query = `
  *[_type=='blog' && slug.current == '${slug}']{
        "currentSlug" : slug.current,
        title,
        content,
        titleImage,
    }[0]`

    return await client.fetch(query)
}

export default async function BlogArticle({params} : {params:{slug:string}}){
    //獲得路由參數

    const data: fullBlog = await getData(params.slug)
    // console.log(data)
    return(
        <div className="mt-8">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                    Peter - Blog
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-wide sm:text-4xl">
                    {data.title}
                </span>
            </h1>

            <Image
                src={urlFor(data.titleImage).url()}
                width={800}
                height={800}
                alt="title image"
                priority
                className="rounded-lg mt-8 border"
            />

            <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-headings:underline prose-li:maker:text-primary prose-a:text-primary">
                <PortableText value={data.content} />
            </div>
        </div>
    )
}