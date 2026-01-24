import React, { useMemo } from "react";

export default function TreeDiagramPage() {
  // ✅ EDIT ONLY THIS ARRAY
  // Each node: { id, label, parentId, width? }
  const nodes = [
    // Root
    { id: "parent", label: "Shopify(8 years)", parentId: null, width: 300 },

    // Level 1
    {
      id: "Theme Dev",
      label: "Theme Dev(3 years)",
      parentId: "parent",
      width: 230,
    },
    {
      id: "APP Dev",
      label: "APP Dev(2 years)",
      parentId: "parent",
      width: 230,
    },
    {
      id: "Admin & APIs",
      label: "Admin & APIs(3 years)",
      parentId: "parent",
      width: 300,
    },
    // Level 2 under right Node1
    {
      id: "Liquid",
      label: "Liquid(2 years)",
      parentId: "Theme Dev",
      width: 250,
    },
    {
      id: "Hydrogen",
      label: "Hydrogen(1 years)",
      parentId: "Theme Dev",
      width: 250,
    },
    { id: "React", label: "React", parentId: "Hydrogen", width: 250 },
    { id: "Next", label: "Next", parentId: "Hydrogen", width: 250 },

    {
      id: "Integrate Backend",
      label: "Integrate Backend",
      parentId: "APP Dev",
      width: 250,
    },
    {
      id: "Extend Functionality",
      label: "Extend Functionality",
      parentId: "APP Dev",
      width: 250,
    },
    { id: "Admin", label: "Admin", parentId: "Admin & APIs", width: 250 },

    { id: "APIs", label: "APIs", parentId: "Admin & APIs", width: 250 },

    {
      id: "Storefront API",
      label: "Storefront API",
      parentId: "APIs",
      width: 250,
    },
    { id: "Admin API", label: "Admin API", parentId: "APIs", width: 250 },
    // { id: "APIs", label: "APIs", parentId: "Admin & APIs", width: 300 },

    // Vertical chain under Node3 (right side)
  ];

  const root = useMemo(() => buildTree(nodes), [nodes]);

  return (
    <div className="page">
      <style>{css}</style>

      <div className="wrap">
        <ul className="root">{root ? <TreeNode node={root} /> : null}</ul>
      </div>
      <div className="description">
        <div>
          “I’m a Full-Stack Developer with about 8 years of experience, and for
          the last few years I’ve been working heavily with Shopify, focusing on
          both custom theme development and Shopify apps. On the frontend, I
          work with Liquid, HTML, CSS, JavaScript, and React, building
          performant and conversion-focused storefronts. On the backend, I’ve
          built custom Shopify apps using Node.js and Python, working with the
          Shopify Admin API, Storefront API, webhooks, and secure authentication
          flows. I’ve worked on real e-commerce features like product
          customization, cart and checkout extensions, metafields,
          subscriptions, and integrations with third-party services such as
          payment providers and analytics tools. Recently, I’ve also been
          involved in headless Shopify projects, where Shopify is used as the
          commerce backend while React handles the storefront, focusing on
          performance and flexibility. What I enjoy most is solving real
          business problems—improving store performance, simplifying admin
          workflows, and increasing conversion rates. I’m now looking for a role
          where I can contribute my Shopify expertise, grow with the team, and
          help build scalable e-commerce solutions.”
        </div>
      </div>
    </div>
  );
}

function TreeNode({ node }) {
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
background:
radial-gradient(1000px 600px at 20% 0%, rgba(79,70,229,0.25), transparent 60%),
radial-gradient(900px 600px at 80% 10%, rgba(109,40,217,0.22), transparent 65%),
radial-gradient(1100px 700px at 60% 95%, rgba(16,185,129,0.12), transparent 60%),
#0b1220;
}
.description {
    padding:20px;
    max-width:1366px;
    background: white;
    color: black;
    font-size: 18px;
    min-height: 150px;
    border-radius: 15px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin: 10px auto;
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
  border-top:2px solid #fff;
}

.li::before{
  right:50%;
  border-right:2px solid #fff;
}
.li::after{
  left:50%;
  border-left:2px solid #fff;
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
  border-left:2px solid #fff;
}

/* vertical connector down into the children group */
.li > ul::before{
  content:"";
  position:absolute;
  top:0;
  left:50%;
  transform:translateX(-50%);
  height:24px;
  border-left:2px solid #fff;
}
.li > ul.no-children::before{
  content:"";
  position:absolute;
  top:0;
  left:50%;
  transform:translateX(-50%);
  height:0px !important; 
  border-left:2px solid #fff;
}

.box{    
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 210px;
    min-height: 50px;
    padding: 5px 16px;
    border: 2px solid #000;
    background: #fff;
    font: 22px / 1.2 Arial, sans-serif;
    color: black;
    box-sizing: border-box;
    border-radius: 17px;
}
`;
