import { SlateViewer } from "@component";
import { LayoutContainer } from "components/Layout";
import {
  PostDetailAuthorInfo,
  PostDetailFloatingReactions,
  PostDetailImage,
  PostDetailReactions,
} from "components/post-detail";
import {
  SidebarContent,
  SidebarPostItem,
  SidebarUserProfiler,
} from "components/Sidebar";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Fragment, useRef } from "react";

const initialValue = [
  { children: [{ text: "shshjhjsdhs", bold: true }], type: "heading-one" },
  { type: "heading-two", children: [{ bold: true, text: "kjdshdhjshjds" }] },
  { children: [{ bold: true, text: "mndsmndsbmnbmds" }] },
  { children: [{ text: "dsmnbmdsbmdsbnm", bold: false }], type: "code" },
  { type: "block-quote", children: [{ bold: false, text: "dshjsdhjjsdhjd" }] },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  {
    type: "link",
    url: "https://miro.medium.com/max/1400/0*iTuEmxLD1IOJ5Xf1.png",
    children: [{ text: "tuhin hhhhhh" }],
  },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  {
    type: "image",
    url: "/demo.png",
    children: [{ text: "" }],
  },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  {
    type: "video",
    url: "https://player.vimeo.com/video/26689853",
    children: [{ text: "" }],
  },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  {
    type: "numbered-list",
    children: [
      { type: "list-item", children: [{ bold: false, text: "dnsdhjdhjs" }] },
    ],
  },
];

interface IParams extends ParsedUrlQuery {
  postId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { postId } = context.params as IParams;

  return { props: { postId }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { postId: "1" } }, { params: { postId: "1" } }],
    fallback: false,
  };
};

const PostPage: NextPage<IParams> = ({ postId }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <Fragment>
      <LayoutContainer
        sidebar={
          <Fragment>
            <SidebarUserProfiler classes={{ root: "mb-10" }} />
            <SidebarContent
              title="More from The RAT Diary"
              classes={{ items: "space-y-4 pb-8" }}
            >
              <SidebarPostItem />
              <SidebarPostItem />
              <SidebarPostItem />
              <SidebarPostItem />
            </SidebarContent>
          </Fragment>
        }
      >
        <article ref={contentRef}>
          <PostDetailAuthorInfo />
          <PostDetailImage />
          <SlateViewer value={initialValue} />
          {/* <div>
            content-{postId}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
            obcaecati, provident vitae repudiandae recusandae fugiat commodi
            tempora dolor natus eius aspernatur alias explicabo fuga numquam
            dicta maxime, repellendus ad veritatis dignissimos totam, beatae
            veniam. Dignissimos, earum eum iusto dolorem nesciunt sit obcaecati
            sed voluptatum amet voluptatibus natus voluptates, soluta vitae
            dolore! Delectus accusantium quam commodi repudiandae aliquam eum
            quis dolorum tempore dolorem vitae. Assumenda, velit hic. Laudantium
            sint ut eveniet recusandae inventore, atque ducimus, explicabo eum
            fuga quaerat quam amet unde blanditiis iste ad, quod nesciunt error!
            Voluptatum eum mollitia laboriosam non ullam culpa aliquam totam ab
            fugiat, deserunt rerum id saepe veniam sed hic, corporis error.
            Nihil laboriosam doloribus corrupti sed ut nemo, ipsam soluta, eum
            tempora necessitatibus minus mollitia enim obcaecati deleniti
            molestiae dolores. Consequatur quis, libero ipsum quas aperiam
            ducimus repellat omnis hic nihil laborum esse voluptatum impedit
            porro in. Exercitationem enim, perferendis reprehenderit at autem
            tempora ipsam nam, dolorum repudiandae eum velit aperiam! Earum, ad
            dolores laboriosam corporis consequuntur mollitia animi repudiandae
            est illo, a tenetur soluta sint pariatur excepturi nostrum
            aspernatur accusamus delectus. Provident enim hic impedit ipsam
            totam sed dolores debitis sunt, in unde consectetur doloribus earum
            facilis modi possimus reiciendis tempore quis fugiat repudiandae
            placeat quisquam praesentium exercitationem! Repudiandae aliquam
            magnam, explicabo iste molestias repellendus quia exercitationem
            veniam quidem delectus a, ea, ex at consequatur? Labore commodi
            mollitia, quae nemo veritatis deleniti veniam cumque sint totam
            voluptatibus incidunt exercitationem minus velit iure neque natus
            porro reiciendis consectetur. Reprehenderit numquam voluptatum
            laborum repellendus minima velit incidunt sapiente, omnis alias
            exercitationem, non laudantium vero inventore quisquam, debitis
            ratione! Pariatur reiciendis ut, id porro, impedit vitae distinctio,
            velit minima aperiam quidem sed in temporibus ad. Tenetur, corporis
            vitae. Deleniti maxime esse nobis aliquid magni, ut eaque placeat
            fuga dolores aspernatur, aperiam hic quaerat alias ex. Mollitia
            fugit praesentium quia asperiores. Labore impedit mollitia vero
            architecto beatae blanditiis sit perferendis veritatis. Ducimus, qui
            illo blanditiis accusamus sint totam asperiores placeat nisi enim
            excepturi ex aperiam mollitia consequatur fugiat. Eum nesciunt odio
            natus iusto quae cupiditate laborum, nihil quod ipsa facilis
            consectetur adipisci asperiores, dolor aspernatur rem voluptatibus
            sint facere vitae voluptate tempora assumenda, perferendis
            exercitationem soluta beatae? Excepturi qui laboriosam explicabo
            ipsam, molestias sit quam consectetur expedita ut deserunt eveniet
            soluta mollitia cum nostrum consequatur eius. Laudantium asperiores,
            impedit, culpa repellat voluptatem atque natus eligendi molestias
            eveniet nulla enim quo iure, odio doloremque dolor id. Iusto rerum
            eligendi sequi fugiat quis eveniet eos porro fuga assumenda,
            voluptatibus, qui placeat sint laborum dolorum ducimus. Quis
            maiores, saepe architecto esse ab impedit unde dolorum ad cumque
            iste nihil laudantium? Minima magnam fugiat, laborum mollitia id
            deserunt, corrupti, velit beatae consequatur dicta nisi molestias
            assumenda illum repellat possimus cum necessitatibus eius ducimus
            quidem dignissimos vitae esse iste debitis. Tempore et doloribus
            eius aperiam, vitae, reprehenderit dignissimos fugiat molestiae quis
            optio, cum ea laboriosam? Maiores harum dignissimos nam, enim eos
            modi error repellat tenetur facilis aliquid assumenda minima fugit
            natus ducimus similique doloremque tempore. Perferendis odio
            quisquam numquam ipsa debitis porro fugiat, libero recusandae
            impedit expedita natus repudiandae consequuntur dolore repellat id
            laborum optio quam esse quas voluptates, dignissimos quis! Odit
            iusto sed rem illum autem doloremque nisi quod labore sint,
            distinctio amet possimus aspernatur dolorem similique voluptas
            excepturi nostrum tempora ullam enim deserunt. Nihil, molestiae.
            Totam itaque molestiae blanditiis voluptas. Placeat facere sunt
            deserunt aut exercitationem dignissimos neque, consequuntur
            incidunt? Consequuntur rerum fuga porro dolores magnam eum
            exercitationem consectetur aperiam similique expedita, corrupti
            optio nihil ut pariatur quis itaque laboriosam velit. Repellendus,
            cum saepe, sed doloribus nulla magni suscipit ea, necessitatibus
            rerum nihil dicta. A ad, voluptates quasi ex distinctio quis dolorem
            tenetur possimus tempora veritatis quisquam ipsum molestias. Facilis
            deleniti omnis at porro saepe cupiditate consectetur nisi, molestiae
            harum tempore eos eligendi optio repellendus non nulla nobis amet.
            Pariatur molestias in non ipsum autem explicabo ipsa quidem voluptas
            neque inventore, rerum labore! Voluptates consectetur aliquam porro
            fugiat. Ipsa beatae, culpa distinctio esse omnis atque laborum
            accusantium fuga laudantium nulla quod aliquid aliquam laboriosam
            non assumenda eos? Incidunt fugit accusantium nam facere veritatis
            pariatur ipsa quia. Voluptas architecto at aliquam ipsa dolorem
            voluptates accusantium nulla adipisci repellendus, debitis a ab?
            Sapiente nisi molestiae eveniet unde nulla soluta eum. Voluptatibus,
            dignissimos corporis quidem unde architecto mollitia, dolore neque
            recusandae laborum repellat deserunt impedit voluptatem, quisquam
            fuga quos. Totam amet neque nobis molestias voluptates ad nostrum
            officia itaque vitae. Vero, nobis, eligendi quidem voluptatum ipsam
            sequi cumque impedit ad, excepturi laudantium recusandae! Modi
            expedita accusantium repellat cumque, aut ut placeat, voluptates
            voluptatem sit, maiores debitis qui at facilis quia incidunt ipsum
            impedit voluptatum nobis nemo enim libero quam. Possimus, porro!
            Perspiciatis harum excepturi voluptates quas unde consequuntur
            fugiat similique est, eius eum placeat ad repudiandae officia labore
            maxime nulla, vel asperiores sint nihil doloremque inventore
            consectetur magni. Odio soluta ducimus porro, delectus, impedit
            voluptatibus voluptatem ex numquam tempore ipsam dignissimos eos
            temporibus quam velit, dolorem animi quisquam. Praesentium sequi
            ipsa consequuntur est adipisci a necessitatibus molestiae at tempore
            maxime ab qui, ullam dignissimos possimus harum eius, quod nihil
            minima aspernatur accusamus laborum distinctio! Distinctio aliquid
            optio nihil molestiae quis id quisquam porro. Deserunt tenetur
            eligendi maiores? Doloribus quod corporis pariatur perferendis culpa
            repellendus cupiditate at voluptate asperiores eligendi
            voluptatibus, eum nemo incidunt error. Repellat consequatur, rerum
            quod ea unde distinctio quam eos tenetur recusandae obcaecati quasi
            dolorum consectetur mollitia deserunt, optio autem error nobis
            possimus! Fuga eius nulla explicabo adipisci, assumenda, quo hic
            eligendi dolor eveniet saepe porro. Cupiditate cum inventore maxime
            quam libero ea ut, rem facere adipisci est temporibus dicta corrupti
            eum. Molestiae numquam vel alias facere quidem. Deserunt odio quae
            sapiente, voluptatum fuga, rem perferendis numquam nulla in, sequi
            fugit nemo ratione dolorum vel iste aut iure nostrum quod nihil
            rerum. Optio, debitis quisquam ipsam corporis similique sapiente
            voluptatum officia maxime, ad blanditiis nesciunt earum explicabo
            cupiditate architecto dolore amet, alias nulla dolor magnam
            aspernatur culpa eum! Dolor quo vel fuga. Nesciunt esse, illum
            recusandae libero, voluptatem explicabo nobis, cum officia ab a
            nulla fugiat deserunt quasi distinctio dolorum!
          </div> */}
        </article>
        <PostDetailFloatingReactions siblingRef={contentRef} />
        <PostDetailReactions />
      </LayoutContainer>
    </Fragment>
  );
};

export default PostPage;
