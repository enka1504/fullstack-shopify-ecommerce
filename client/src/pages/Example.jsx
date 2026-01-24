// import React from "react";

// export default function TreePage() {
//   const data = {
//     label: "2",
//     children: [
//       {
//         label: "sdf",
//         children: [
//           {
//             label: "sdfsdf",
//             children: [
//               {
//                 label: "sdfsdf",
//                 children: [{ label: "sdf", children: [{ label: "sdfsdf" }] }],
//               },
//             ],
//           },
//           {
//             label: "sdfsdf",
//             children: [
//               {
//                 label: "ewrwerwe",
//                 children: [
//                   { label: "werwer", children: [{ label: "sdfsdf" }] },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         label: "sdf",
//         children: [
//           {
//             label: "sdf",
//             children: [
//               {
//                 label: "sdfsdf",
//                 children: [
//                   { label: "werwer", children: [{ label: "sdfsdf" }] },
//                 ],
//               },
//             ],
//           },
//           {
//             label: "sdfsdf",
//             children: [
//               {
//                 label: "sdfsdf",
//                 children: [
//                   { label: "sdfsdf", children: [{ label: "dsfdsf" }] },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   };

//   function TreeNode({ node }) {
//     return (
//       <li className="li">
//         <div className="box">{node.label}</div>

//         {node.children?.length ? (
//           <ul className="ul">
//             {node.children.map((child, idx) => (
//               <TreeNode key={idx} node={child} />
//             ))}
//           </ul>
//         ) : null}
//       </li>
//     );
//   }

//   return (
//     <div className="page">
//       <style>{css}</style>

//       <div className="wrap">
//         <ul className="root">
//           <TreeNode node={data} />
//         </ul>
//       </div>
//     </div>
//   );
// }

// const css = `
// .page{
//   width:100%;
//   min-height:100vh;
//   background:#fff;
// }

// .wrap{
//   width:100%;
//   overflow:auto;
//   padding:24px;
// }

// /* UL layout */
// .root, .root ul{
//   margin:0;
//   padding-left:0;
//   padding-top:24px;
//   position:relative;
//   display:flex;
//   justify-content:center;
// }

// .li{
//   list-style:none;
//   text-align:center;
//   position:relative;
//   padding:24px 12px 0 12px;
// }

// /* sibling horizontal connector */
// .li::before,
// .li::after{
//   content:"";
//   position:absolute;
//   top:0;
//   width:50%;
//   height:24px;
//   border-top:2px solid #000;
// }

// .li::before{
//   right:50%;
//   border-right:2px solid #000;
// }
// .li::after{
//   left:50%;
//   border-left:2px solid #000;
// }

// /* only child: no sibling connectors */
// .li:only-child::before,
// .li:only-child::after{
//   display:none;
// }

// /* remove extra top border at ends, keep vertical join */
// .li:first-child::before{
//   border-top:0;
//   border-right:2px solid #000;
// }
// .li:last-child::after{
//   border-top:0;
//   border-left:2px solid #000;
// }

// /* vertical connector down into the children group */
// .li > ul::before{
//   content:"";
//   position:absolute;
//   top:0;
//   left:50%;
//   transform:translateX(-50%);
//   height:24px;
//   border-left:2px solid #000;
// }

// /* node box */
// .box{
//   display:inline-flex;
//   align-items:center;
//   justify-content:center;
//   min-width:210px;
//   height:44px;
//   padding:0 16px;
//   border:2px solid #000;
//   background:#fff;
//   font:14px/1.2 Arial, sans-serif;
//   color:#000;
//   box-sizing:border-box;
// }
// `;
//
// import React, { useMemo } from "react";

/**
 * Single-file React page that renders a box-and-connector tree diagram.
 * Edit ONLY the `nodes` array.
 */
// export default function TreeDiagramPage() {
//   // ✅ EDIT ONLY THIS ARRAY
//   // Each node: { id: string, label: string, parentId: string | null }
//   const nodes = [
//     { id: "root", label: "2", parentId: null },

//     { id: "l1", label: "sdf", parentId: "root" },
//     { id: "r1", label: "sdf", parentId: "root" },

//     { id: "l1a", label: "sdfsdf", parentId: "l1" },

//     { id: "l1a1", label: "sdfsdf", parentId: "l1a" },
//     { id: "l1a2", label: "sdf", parentId: "l1a1" },
//     { id: "l1a3", label: "sdfsdf", parentId: "l1a2" },

//     { id: "l1b1", label: "ewrwerwe", parentId: "l1b" },
//     { id: "l1b2", label: "werwer", parentId: "l1b1" },
//     { id: "l1b3", label: "sdfsdf", parentId: "l1b2" },

//     { id: "r1a", label: "sdf", parentId: "r1" },
//     { id: "r1b", label: "sdfsdf", parentId: "r1" },

//     { id: "r1a1", label: "sdfsdf", parentId: "r1a" },
//     { id: "r1a2", label: "werwer", parentId: "r1a1" },
//     { id: "r1a3", label: "sdfsdf", parentId: "r1a2" },

//     { id: "r1b1", label: "sdfsdf", parentId: "r1b" },
//     { id: "r1b2", label: "sdfsdf", parentId: "r1b1" },
//     { id: "r1b3", label: "dsfdsf", parentId: "r1b2" },

//     { id: "r1b4", label: "A", parentId: "r1b3" },
//     { id: "r1b5", label: "B", parentId: "r1b3" },
//   ];

//   const root = useMemo(() => buildTree(nodes), [nodes]);

//   return (
//     <div className="page">
//       <style>{css}</style>

//       <div className="wrap">
//         <ul className="root">{root ? <TreeNode node={root} /> : null}</ul>
//       </div>
//     </div>
//   );
// }

// function TreeNode({ node }) {
//   return (
//     <li className="li">
//       <div className="box">{node.label}</div>

//       {node.children?.length ? (
//         <ul className="ul">
//           {node.children.map((child) => (
//             <TreeNode key={child.id} node={child} />
//           ))}
//         </ul>
//       ) : null}
//     </li>
//   );
// }

// function buildTree(nodes) {
//   const byId = new Map(nodes.map((n) => [n.id, { ...n, children: [] }]));
//   let root = null;

//   for (const n of byId.values()) {
//     if (n.parentId == null) {
//       root = n;
//     } else {
//       const parent = byId.get(n.parentId);
//       if (parent) parent.children.push(n);
//     }
//   }

//   // Stable ordering: insertion order from `nodes`
//   for (const n of nodes) {
//     const node = byId.get(n.id);
//     if (!node?.children?.length) continue;
//     node.children.sort(
//       (a, b) =>
//         nodes.findIndex((x) => x.id === a.id) -
//         nodes.findIndex((x) => x.id === b.id),
//     );
//   }

//   return root;
// }

// const css = `
// .page{
//   width:100%;
//   min-height:100vh;
//   background:#fff;
// }

// .wrap{
//   width:100%;
//   overflow:auto;
//   padding:24px;
// }

// /* UL layout */
// .root, .root ul{
//   margin:0;
//   padding-left:0;
//   padding-top:24px;
//   position:relative;
//   display:flex;
//   justify-content:center;
// }

// .li{
//   list-style:none;
//   text-align:center;
//   position:relative;
//   padding:24px 12px 0 12px;
// }

// /* sibling horizontal connector */
// .li::before,
// .li::after{
//   content:"";
//   position:absolute;
//   top:0;
//   width:50%;
//   height:24px;
//   border-top:2px solid #000;
// }

// .li::before{
//   right:50%;
//   border-right:2px solid #000;
// }
// .li::after{
//   left:50%;
//   border-left:2px solid #000;
// }

// /* only child: no sibling connectors */
// .li:only-child::before,
// .li:only-child::after{
//   display:none;
// }

// /* remove extra top border at ends, keep vertical join */
// .li:first-child::before{
//   border-top:0;
//   border-right:2px solid #000;
// }
// .li:last-child::after{
//   border-top:0;
//   border-left:2px solid #000;
// }

// /* vertical connector down into the children group */
// .li > ul::before{
//   content:"";
//   position:absolute;
//   top:0;
//   left:50%;
//   transform:translateX(-50%);
//   height:24px;
//   border-left:2px solid #000;
// }

// /* node box */
// .box{
//   display:inline-flex;
//   align-items:center;
//   justify-content:center;
//   min-width:210px;
//   height:44px;
//   padding:0 16px;
//   border:2px solid #000;
//   background:#fff;
//   font:14px/1.2 Arial, sans-serif;
//   color:#000;
//   box-sizing:border-box;
// }
// `;

// import React, { useMemo } from "react";

/**
 * Single-file React page that renders a box-and-connector tree diagram.
 * Edit ONLY the `nodes` array.
 */
// export default function TreeDiagramPage() {
//   // ✅ EDIT ONLY THIS ARRAY
//   // Each node: { id: string, label: string, parentId: string | null }
//   const nodes = [
//     // Root
//     { id: "parent", label: "Parent", parentId: null, width: 260 },

//     // Level 1
//     { id: "leftNode1", label: "Node1", parentId: "parent", width: 210 },
//     { id: "rightNode1", label: "Node1", parentId: "parent", width: 300 },

//     // Level 2 under right Node1
//     { id: "node2", label: "Node2", parentId: "rightNode1", width: 150 },
//     { id: "node3_top", label: "Node3", parentId: "rightNode1", width: 210 },

//     // Vertical chain under Node3 (right side)
//     { id: "node3_1", label: "Node3", parentId: "node3_top", width: 170 },
//     { id: "node3_2", label: "Node3", parentId: "node3_1", width: 170 },
//     { id: "node3_3", label: "Node3", parentId: "node3_2", width: 210 },
//   ];

//   // (Optional) quick sanity check: ensure exactly one root
//   // console.assert(nodes.filter(n => n.parentId == null).length === 1, "Tree must have one root");

//   const root = useMemo(() => buildTree(nodes), [nodes]);

//   return (
//     <div className="page">
//       <style>{css}</style>

//       <div className="wrap">
//         <ul className="root">{root ? <TreeNode node={root} /> : null}</ul>
//       </div>
//     </div>
//   );
// }

// function TreeNode({ node }) {
//   return (
//     <li className="li">
//       <div
//         className="box"
//         style={node.width ? { width: node.width } : undefined}
//       >
//         {node.label}
//       </div>

//       {node.children?.length ? (
//         <ul className="ul">
//           {node.children.map((child) => (
//             <TreeNode key={child.id} node={child} />
//           ))}
//         </ul>
//       ) : null}
//     </li>
//   );
// }

// function buildTree(nodes) {
//   const byId = new Map(nodes.map((n) => [n.id, { ...n, children: [] }]));
//   let root = null;

//   for (const n of byId.values()) {
//     if (n.parentId == null) {
//       root = n;
//     } else {
//       const parent = byId.get(n.parentId);
//       if (parent) parent.children.push(n);
//     }
//   }

//   // Stable ordering: insertion order from `nodes`
//   for (const n of nodes) {
//     const node = byId.get(n.id);
//     if (!node?.children?.length) continue;
//     node.children.sort(
//       (a, b) =>
//         nodes.findIndex((x) => x.id === a.id) -
//         nodes.findIndex((x) => x.id === b.id),
//     );
//   }

//   return root;
// }

// const css = `
// .page{
//   width:100%;
//   min-height:100vh;
//   background:#fff;
// }

// .wrap{
//   width:100%;
//   overflow:auto;
//   padding:24px;
// }

// /* UL layout */
// .root, .root ul{
//   margin:0;
//   padding-left:0;
//   padding-top:24px;
//   position:relative;
//   display:flex;
//   justify-content:center;
// }

// .li{
//   list-style:none;
//   text-align:center;
//   position:relative;
//   padding:24px 12px 0 12px;
// }

// /* sibling horizontal connector */
// .li::before,
// .li::after{
//   content:"";
//   position:absolute;
//   top:0;
//   width:50%;
//   height:24px;
//   border-top:2px solid #000;
// }

// .li::before{
//   right:50%;
//   border-right:2px solid #000;
// }
// .li::after{
//   left:50%;
//   border-left:2px solid #000;
// }

// /* only child: no sibling connectors */
// .li:only-child::before,
// .li:only-child::after{
//   display:none;
// }

// /* remove extra top border at ends, keep vertical join */
// .li:first-child::before{
//   border-top:0;
//   border-right:2px solid #000;
// }
// .li:last-child::after{
//   border-top:0;
//   border-left:2px solid #000;
// }

// /* vertical connector down into the children group */
// .li > ul::before{
//   content:"";
//   position:absolute;
//   top:0;
//   left:50%;
//   transform:translateX(-50%);
//   height:24px;
//   border-left:2px solid #000;
// }

// /* node box */
// .box{
//   display:inline-flex;
//   align-items:center;
//   justify-content:center;
//   min-width:210px;
//   height:44px;
//   padding:0 16px;
//   border:2px solid #000;
//   background:#fff;
//   font:14px/1.2 Arial, sans-serif;
//   color:#000;
//   box-sizing:border-box;
// }
// `;

import React, { useMemo } from "react";

export default function TreeDiagramPage() {
  // ✅ EDIT ONLY THIS ARRAY
  // Each node: { id, label, parentId, width? }
  const nodes = [
    // Root
    { id: "parent", label: "Parent", parentId: null, width: 260 },

    // Level 1
    { id: "leftNode1", label: "Node1", parentId: "parent", width: 210 },
    { id: "rightNode1", label: "Node1", parentId: "parent", width: 300 },

    // Level 2 under right Node1
    { id: "node2", label: "Node2", parentId: "rightNode1", width: 150 },
    { id: "node3_top", label: "Node3", parentId: "rightNode1", width: 210 },

    // Vertical chain under Node3 (right side)
    { id: "node3_1", label: "Node3", parentId: "node3_top", width: 170 },
    { id: "node3_2", label: "Node3", parentId: "node3_1", width: 170 },
    { id: "node3_3", label: "Node3", parentId: "node3_2", width: 210 },
  ];

  const root = useMemo(() => buildTree(nodes), [nodes]);

  return (
    <div className="page">
      <style>{css}</style>

      <div className="wrap">
        <ul className="root">{root ? <TreeNode node={root} /> : null}</ul>
      </div>
    </div>
  );
}

function TreeNode({ node }) {
  console.log(node.children.length, "node", node);

  let classUl = "ul";
  classUl = node.children.length !== 0 ? classUl : "ul no-children";
  return (
    <li className="li">
      <div
        className="box"
        style={node.width ? { width: node.width } : undefined}
      >
        {node.label}
      </div>

      {node.children && node.children.length ? (
        <ul className={`${classUl}`}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function buildTree(nodes) {
  const byId = new Map(nodes.map((n) => [n.id, { ...n, children: [] }]));
  let root = null;

  for (const n of byId.values()) {
    if (n.parentId == null) {
      root = n;
    } else {
      const parent = byId.get(n.parentId);
      if (parent) parent.children.push(n);
    }
  }

  // Keep children order same as nodes array order
  const indexOf = (id) => nodes.findIndex((x) => x.id === id);
  for (const n of byId.values()) {
    if (n.children && n.children.length) {
      n.children.sort((a, b) => indexOf(a.id) - indexOf(b.id));
    }
  }

  return root;
}

const css = `
.page{
  width:100%;
  min-height:100vh;
  background:#fff;
}

.wrap{
  width:100%;
  overflow:auto;
  padding:24px;
}

/* UL layout */
.root, .root ul{
  margin:0;
  padding-left:0;
  padding-top:24px;
  position:relative;
  display:flex;
  justify-content:center;
}

.li{
  list-style:none;
  text-align:center;
  position:relative;
  padding:24px 12px 0 12px;
}

/* sibling horizontal connector */
.li::before,
.li::after{
  content:"";
  position:absolute;
  top:0;
  width:50%;
  height:24px;
  border-top:2px solid #000;
}

.li::before{
  right:50%;
  border-right:2px solid #000;
}
.li::after{
  left:50%;
  border-left:2px solid #000;
}

/* only child: no sibling connectors */
.li:only-child::before,
.li:only-child::after{
  display:none;
}

/* remove extra top border at ends */
.li:first-child::before{
  border-top:0;
  border-right:0;
}
.li:last-child::after{
  border-top:0;
  border-left:0;
}

/* If a parent has children, draw ONLY the vertical line from the parent down to its children */
.li > ul::before{
  content:"";
  position:absolute;
  top:0;
  left:50%;
  transform:translateX(-50%);
  height:24px;
  border-left:2px solid #000;
}

/* vertical connector down into the children group */
.li > ul::before{
  content:"";
  position:absolute;
  top:0;
  left:50%;
  transform:translateX(-50%);
  height:24px;
  border-left:2px solid #000;
}
.li > ul.no-children::before{
  content:"";
  position:absolute;
  top:0;
  left:50%;
  transform:translateX(-50%);
  height:0px !important; 
  border-left:2px solid #000;
}

/* node box */
.box{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:210px;
  height:44px;
  padding:0 16px;
  border:2px solid #000;
  background:#fff;
  font:14px/1.2 Arial, sans-serif;
  color:#000;
  box-sizing:border-box;
}
`;
