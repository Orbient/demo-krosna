import{r as e}from"./preact.module.Bl7PEaKa.js";import{a as t,i as n,t as r}from"./hooks.module.U3JihANK.js";import{O as i,S as a,a as o,i as s,l as c,n as l,p as u,r as d,s as f,v as p,y as m}from"./stores.o6Bgqmk7.js";import{t as h}from"./preact.D2i_iJfy.js";import{r as g,u as _}from"./site.BSjk07bo.js";import{o as v,r as y,t as b}from"./format.BHXeJCIf.js";import{i as x}from"./img.N_jAUtwm.js";import{t as S}from"./jsxRuntime.module.Bfdc-KV3.js";import{n as C,o as w,t as T}from"./ui.D-7mQ7G8.js";import{t as E}from"./focus.DwZVVIvN.js";function D(){let i=h(s),[a,o]=n(!1),[c,l]=n(!1),u=r(null),d=r(null);if(t(()=>{if(i)d.current=document.activeElement,o(!0),requestAnimationFrame(()=>requestAnimationFrame(()=>l(!0))),document.documentElement.style.overflow=`hidden`;else if(a){l(!1),document.documentElement.style.overflow=``;let e=setTimeout(()=>o(!1),220);return d.current?.focus?.(),()=>clearTimeout(e)}},[i]),t(()=>{c&&u.current?.querySelector(`[data-autofocus]`)?.focus()},[c]),t(()=>{let e=()=>s.set(!1);return document.addEventListener(`astro:before-swap`,e),()=>document.removeEventListener(`astro:before-swap`,e)},[]),!a)return null;let f=()=>s.set(!1);return S(e,{children:[S(`div`,{class:`scrim${c?` open`:``}`,onClick:f,"aria-hidden":`true`}),S(`div`,{ref:u,class:`drawer${c?` open`:``}`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`cart-title`,onKeyDown:e=>{e.key===`Escape`&&f(),e.key===`Tab`&&u.current&&E(u.current,e)},children:S(O,{inDrawer:!0,onClose:f})})]})}function O({inDrawer:t=!1,onClose:n}){let r=h(d),s=h(l),E=h(u),D=h(f),O=h(o),A=h(c),j=g(O),M=E+D,N=_.minskFreeFrom-E;return S(`div`,{class:`cart ${t?`in-drawer`:`on-page`}`,children:[t&&S(`div`,{class:`drawer-head`,children:[S(`h2`,{id:`cart-title`,children:[`Корзина `,s>0&&S(`span`,{class:`muted num`,style:`font: 400 16px var(--font-sans); margin-left: 6px`,children:y(s)})]}),S(`button`,{type:`button`,class:`icon-btn`,onClick:n,"aria-label":`Закрыть корзину`,"data-autofocus":!0,children:S(T,{name:`close`})})]}),S(`div`,{class:`cart-scroll`,children:[r.length>0&&S(`div`,{class:`ship`,"aria-live":`polite`,children:j.kind===`minsk`?N>0?S(e,{children:[S(`p`,{class:`num`,children:[`До бесплатной доставки по Минску осталось `,S(`b`,{children:b(N)})]}),S(`span`,{class:`bar`,children:S(`i`,{style:{width:`${Math.min(100,E/_.minskFreeFrom*100)}%`}})})]}):S(`p`,{children:`Доставка по Минску бесплатная`}):S(`p`,{class:`num`,children:[`Доставка `,j.in,`: `,b(_.countryDelivery)]})}),A&&S(`div`,{class:`undo`,role:`status`,children:[S(`span`,{children:[`Удалено: `,i.get(A.item.slug)?.name]}),S(`button`,{type:`button`,class:`link`,onClick:a,children:`Вернуть`})]}),r.length===0?S(`div`,{class:`empty`,children:[S(`p`,{class:`title`,children:`В корзине пока ничего нет`}),S(`p`,{class:`small muted`,children:`Кресла и диваны из наличия отгружаем за 2 дня.`}),S(`a`,{class:`btn btn-main`,href:x(`catalog/`),onClick:n,children:`Открыть каталог`})]}):S(`ul`,{class:`lines`,children:r.map(e=>S(`li`,{children:[S(`a`,{class:`th`,href:w(e.product,e.variant),onClick:n,tabIndex:-1,"aria-hidden":`true`,children:S(C,{k:`${e.slug}/${e.variant}`,view:`main`,sizes:`96px`,alt:``})}),S(`div`,{class:`info`,children:[S(`a`,{class:`nm`,href:w(e.product,e.variant),onClick:n,children:e.product.name}),S(`span`,{class:`small muted`,children:e.v.line}),S(`span`,{class:`small muted`,children:e.v.stock===`in`?`В наличии`:`Под заказ, 14 дней`}),S(`div`,{class:`row`,children:[S(`div`,{class:`qty`,role:`group`,"aria-label":`Количество: ${e.product.name}`,children:[S(`button`,{type:`button`,onClick:()=>m(e.slug,e.variant,e.qty-1),disabled:e.qty<=1,"aria-label":`Меньше`,children:S(T,{name:`minus`})}),S(`span`,{class:`num`,"aria-live":`polite`,children:e.qty}),S(`button`,{type:`button`,onClick:()=>m(e.slug,e.variant,e.qty+1),"aria-label":`Больше`,children:S(T,{name:`plus`})})]}),S(`button`,{type:`button`,class:`rm small`,onClick:()=>p(e.slug,e.variant),children:[`Удалить`,S(`span`,{class:`sr-only`,children:[` `,e.product.name]})]})]})]}),S(`span`,{class:`sum price`,children:b(e.sum)})]},`${e.slug}-${e.variant}`))})]}),r.length>0&&S(`div`,{class:`totals`,children:[S(`dl`,{class:`num`,children:[S(`div`,{children:[S(`dt`,{children:`Товары`}),S(`dd`,{children:b(E)})]}),S(`div`,{children:[S(`dt`,{children:[`Доставка `,j.kind===`minsk`?`по Минску`:j.in]}),S(`dd`,{children:D===0?`бесплатно`:b(D)})]}),S(`div`,{class:`sum`,children:[S(`dt`,{children:`Итого`}),S(`dd`,{children:b(M)})]})]}),S(`p`,{class:`small muted num`,children:[v(M),` без переплат. Подъём и сборку (`,b(_.assembly),`) можно добавить при оформлении.`]}),S(`a`,{class:`btn btn-main`,href:x(`checkout/`),onClick:n,children:`Оформить заказ`}),t&&S(`a`,{class:`link small go`,href:x(`cart/`),onClick:n,children:`Перейти в корзину`})]}),S(`style`,{children:k})]})}var k=`
.cart{display:flex;flex-direction:column;min-height:0;flex:1}
.cart.in-drawer{height:100%}
.cart-scroll{flex:1;overflow:auto;overscroll-behavior:contain}
.in-drawer .cart-scroll{padding:0 24px}
@media (max-width:767px){.in-drawer .cart-scroll{padding:0 16px}}
.ship{padding:16px 0;border-bottom:1px solid var(--color-nitka);font-size:15px}
.ship b{font-weight:600}
.ship .bar{display:block;height:3px;margin-top:10px;background:var(--color-nitka)}
.ship .bar i{display:block;height:100%;background:var(--color-lyanok);transition:width var(--t-move) var(--ease-move)}
.undo{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;padding:8px 0;border-bottom:1px solid var(--color-nitka);font-size:15px}
.undo .link{min-height:44px;font-weight:500}
.lines{list-style:none}
.lines li{display:grid;grid-template-columns:96px 1fr auto;gap:14px;padding:16px 0;border-bottom:1px solid var(--color-nitka)}
.lines .th{display:block;width:96px;aspect-ratio:1;position:relative}
.lines .th picture,.lines .th img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.lines .info{display:grid;gap:2px;align-content:start;min-width:0}
.lines .nm{font:400 17px/1.25 var(--font-serif)}
.lines .nm:hover{text-decoration:underline;text-underline-offset:3px}
.lines .row{display:flex;align-items:center;gap:14px;margin-top:8px}
.lines .sum{white-space:nowrap;font-size:16px}
@media (max-width:480px){.lines li{grid-template-columns:72px minmax(0,1fr) auto;gap:12px}.lines .th{width:72px}.lines .row{flex-wrap:wrap;gap:4px 14px}}
.qty{display:inline-grid;grid-template-columns:44px 36px 44px;align-items:center;height:44px;border:1px solid var(--color-nitka-strong);border-radius:2px;text-align:center}
.qty button{display:grid;place-items:center;height:42px}
.qty button svg{width:16px;height:16px}
.qty button[disabled]{opacity:.35;cursor:default}
.rm{min-height:44px;color:var(--color-bor-2);text-decoration:underline;text-underline-offset:3px}
.rm:hover{color:var(--color-bor)}
.totals{padding:16px 24px calc(20px + env(safe-area-inset-bottom));border-top:1px solid var(--color-nitka);display:grid;gap:12px;background:var(--color-paper)}
@media (max-width:767px){.totals{padding-inline:16px}}
.totals dl{display:grid;gap:4px;font-size:15px}
.totals dl div{display:flex;justify-content:space-between;gap:16px}
.totals dt{color:var(--color-bor-2)}
.totals .sum{margin-top:6px;font:500 20px/1.2 var(--font-sans)}
.totals .sum dt{color:var(--color-bor)}
.totals .btn{width:100%}
.totals .go{justify-self:center;min-height:36px;display:inline-flex;align-items:center}
.empty{display:grid;gap:12px;justify-items:start;padding:32px 0}
.on-page .totals{padding:20px 0 0;border:0;background:none}
`;export{O as CartBody,D as default};