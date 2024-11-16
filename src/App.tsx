import { useEffect, useRef, useState } from "react";
import { DemoCard, RefElement } from "./components/DemoCard";
import { FormField } from "./components/FormField";
import { FormHeader } from "./components/FormHeader";
import { SubFormField } from "./components/SubFormField";
import erd from "./assets/erd.png";
import "./App.css";

function App() {
  const contentRef1 = useRef<RefElement>(null);
  const contentRef2 = useRef<RefElement>(null);
  const contentRef3 = useRef<RefElement>(null);
  const contentRef4 = useRef<RefElement>(null);

  const [validLocation, setValidLocation] = useState<{
    city: Boolean;
    province: boolean;
  }>({
    city: true,
    province: true,
  });

  const jsCodeSample = `// every component is broken into three parts:
// useX (the hook, for all logic an data)
// pureX (the ui, pure jsx, fault tolerant)
// X (the combinator, below)

export const EditPost = (props) => {
  const editPost = useEditPost(props);
  return <PureEditPost {...editPost} />;
};`;

  const goCodeSample = `type PostSearchParams struct {
  Full   bool \`json:"full"\`
  Offset int  \`json:"offset"\`
  Limit  int  \`json:"limit"\`
  SortBy    int    \`json:"sort_by"\`
  Term      string \`json:"term"\`
  Countries []int  \`json:"countries"\`
  Location  struct {
    Valid     bool    \`json:"valid"\`
    Latitude  float64 \`json:"latitude"\`
    Longitude float64 \`json:"longitude"\`
    Radius    float64 \`json:"radius"\`
  } \`json:"location"\`
}`;

  const rustCodeSample = `"IS-ASC" => {
  let mut v = super::any_level::is_asc::IsAsc::new();
  match v.validate(self, n) {
    Ok(_) => {
      self.set_return_type(v.return_type());
      self.last_writer = Some(Box::new(v));
      return Ok(());
    }
    Err(e) => return Err(e),
  }
}`;

  useEffect(() => {
    const getParent = (ref: React.RefObject<RefElement>) => {
      const elem = ref.current?.closest(".demo-card");
      if (!elem) {
        return null;
      } else {
        return elem as HTMLDivElement;
      }
    };

    const contentParent1 = getParent(contentRef1);
    const contentParent2 = getParent(contentRef2);
    const contentParent3 = getParent(contentRef3);
    const contentParent4 = getParent(contentRef4);

    const calculateVisibleRatio = (boundingRect: DOMRect) => {
      const top = boundingRect.top;
      const bottom = boundingRect.bottom;
      const height = boundingRect.height;

      if (top > window.innerHeight || bottom < 0) {
        return 0;
      } else if (top <= 0 && bottom >= window.innerHeight) {
        return 1;
      } else if (top >= 0 && bottom <= window.innerHeight) {
        return 1;
      } else if (
        bottom < window.innerHeight &&
        bottom > window.innerHeight - 5
      ) {
        return 1;
      } else if (top <= 0) {
        return bottom / height;
      } else {
        return (window.innerHeight - top) / height;
      }
    };

    const applyStyles = (
      ref: React.RefObject<RefElement>,
      parent: HTMLDivElement | null,
    ) => {
      if (!ref.current || !parent) {
        return;
      }

      const boundingRect = parent.getBoundingClientRect();
      const visibleRatio = calculateVisibleRatio(boundingRect);
      ref.current.style.setProperty(
        "--content-panel-opacity",
        visibleRatio.toString(),
      );
      ref.current.style.setProperty(
        "--content-panel-blur",
        `${(1 - visibleRatio) * 10}px`,
      );
    };

    let lastKnownScrollPosition = 0;
    const handleScroll = () => {
      if (window.scrollY === lastKnownScrollPosition) {
        return;
      }

      lastKnownScrollPosition = window.scrollY;

      applyStyles(contentRef1, contentParent1);
      applyStyles(contentRef2, contentParent2);
      applyStyles(contentRef3, contentParent3);
      applyStyles(contentRef4, contentParent4);
    };

    const timer = setInterval(() => {
      handleScroll();
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [contentRef1, contentRef2, contentRef3, contentRef4]);

  return (
    <>
      <div className="flex min-h-screen min-w-full justify-center bg-sky-950">
        <div className="w-full max-w-screen-md">
          <div className="relative">
            <div className="info-shadow" />
            <form className="info p-2 pb-4 md:p-4">
              <div className="grid grid-cols-2">
                <FormHeader
                  number="1"
                  text="Personal Information"
                  className="col-span-2"
                />
                <FormField
                  id="pi-fn"
                  label="First Name"
                  value="Liam"
                  className="col-span-1 border-l-2"
                />
                <FormField
                  id="pf-ln"
                  label="Last Name"
                  value="Marcassa"
                  className="col-span-1"
                />
                <FormField
                  id="pi-o"
                  label="Occupation"
                  value="web developer"
                  className="col-span-2 border-l-2 md:col-span-1"
                />
                <FormField
                  id="pi-l"
                  label="Location"
                  className="col-span-2 border-l-2 md:col-span-1 md:border-l-0"
                  isValid={validLocation.city && validLocation.province}
                  child={
                    <div className="grid grid-cols-4">
                      <SubFormField
                        id="pi-city"
                        label="City"
                        value="Ottawa"
                        className="col-span-3"
                        onIsValid={(v: boolean) =>
                          setValidLocation((prev) => ({ ...prev, city: v }))
                        }
                      />
                      <SubFormField
                        id="pi-province"
                        label="Province"
                        value="ON"
                        className="col-span-1"
                        onIsValid={(v: boolean) =>
                          setValidLocation((prev) => ({ ...prev, province: v }))
                        }
                        inputProps={{ maxLength: 2 }}
                      />
                    </div>
                  }
                />
                <FormField
                  id="pi-e"
                  label="Email"
                  value="markassa(at)gmail.com"
                  className="col-span-2 rounded-b-lg border-l-2"
                  pattern="markassa\@gmail\.com"
                  inputProps={{
                    placeholder: "markassa@gmail.com",
                  }}
                />
              </div>
              <div className="mt-3">
                <FormHeader
                  number="2"
                  text="Experience"
                  className="col-span-4"
                />
                <div className="flex">
                  <p className="write-sideways w-5 border-b-2 border-l-2 border-black text-center text-sm leading-4">
                    most recent
                  </p>
                  <div className="w-full">
                    <FormField
                      id="ex1-p"
                      label="Position"
                      value="Senior, Full-Stack"
                      className="border-l-2"
                    />
                    <div className="flex">
                      <FormField
                        id="ex1-e"
                        label="Employer"
                        value="GameSheet Inc."
                        className="grow border-l-2"
                      />
                      <FormField
                        id="ex1-sy"
                        label="Start Year"
                        value="2020"
                        className="w-24 shrink-0 grow-0 md:w-32"
                        inputProps={{ maxLength: 4 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-5 border-b-2 border-l-2 border-black"></div>
                  <div className="w-full">
                    <FormField
                      id="ex1-p"
                      label="Position"
                      value="Joomla Developer"
                      className="border-l-2"
                    />
                    <div className="flex">
                      <FormField
                        id="ex1-e"
                        label="Employer"
                        value="Publivate Inc."
                        className="grow border-l-2"
                      />
                      <FormField
                        id="ex1-sy"
                        label="Start Year"
                        value="2019"
                        className="w-24 shrink-0 grow-0 md:w-32"
                        inputProps={{ maxLength: 4 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-5 rounded-bl-lg border-b-2 border-l-2 border-black"></div>
                  <div className="w-full">
                    <FormField
                      id="ex1-p"
                      label="Position"
                      value="Magento Developer"
                      className="border-l-2"
                    />
                    <div className="flex">
                      <FormField
                        id="ex1-e"
                        label="Employer"
                        value="CWD"
                        className="grow border-l-2"
                      />
                      <FormField
                        id="ex1-sy"
                        label="Start Year"
                        value="2018"
                        className="w-24 shrink-0 grow-0 rounded-br-lg md:w-32"
                        inputProps={{ maxLength: 4 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2">
                <FormHeader
                  number="3"
                  text="Education"
                  className="col-span-2"
                />
                <FormField
                  id="e-s"
                  label="School"
                  value="Brock University"
                  className="col-span-2 border-l-2 md:col-span-1"
                />
                <FormField
                  id="e-m"
                  label="Major"
                  value="Computer Science"
                  className="col-span-2 border-l-2 md:col-span-1 md:border-l-0"
                />
                <div className="col-span-2 flex">
                  <FormField
                    id="e-d"
                    label="Degree"
                    value="BSc"
                    className="rounded-bl-lg border-l-2"
                  />
                  <FormField id="e-mi" label="Minor" value="Math" />
                  <FormField
                    id="e-y"
                    label="End Year"
                    value="2019"
                    className="w-24 shrink-0 grow-0 rounded-br-lg md:w-32"
                    inputProps={{ maxLength: 4 }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="mb-8 mt-10">
            <h2 className="text-center text-2xl text-slate-50/95">
              Sample Work
            </h2>
            <DemoCard
              ref={contentRef1}
              link="https://github.com/cruncha-cruncha/zork1-compiler/blob/master/src/stats/routine_tracker.rs"
              explanation={
                <>
                  <p>Rust</p>
                  <p className="mt-2">
                    This excerpt comes from a transpiler (zil-like to js).
                    Zil-like uses polish notation, so an 'is-ascending' operator
                    makes more sense than 'greater-than' or 'less-than'. By this
                    point in the transpiler, zil-like code has been parsed into
                    an AST which now needs to be validated: is-asc takes at
                    least two numbers or numeric variables. By boxing{" "}
                    <code>v</code> as <code>last_writer</code>, this code builds
                    a tree of traits.
                  </p>
                </>
              }
              content={
                <div className="w-fit p-4 text-orange-300">
                  <pre>
                    <code>{rustCodeSample}</code>
                  </pre>
                </div>
              }
            />
            <DemoCard
              ref={contentRef2}
              link="https://github.com/cruncha-cruncha/lobster/blob/main/frontend/src/pages/EditPost.jsx"
              explanation={
                <>
                  <p>React</p>
                  <p className="mt-2">
                    Frustrated with large components, this pattern is from a
                    personal project. The hook and ui can be broken down further
                    as needed, but the combinator is always as shown. This
                    promotes separation of concerns, and forces the interface
                    between user and data to be minimal and well-named. It also
                    promotes reusability as visuals and behaviour are easily
                    re-combined.
                  </p>
                </>
              }
              content={
                <div className="w-fit p-4 text-orange-300">
                  <pre>
                    <code>{jsCodeSample}</code>
                  </pre>
                </div>
              }
            />
            <DemoCard
              ref={contentRef3}
              link="https://github.com/cruncha-cruncha/lobster/blob/main/search-handler/elastic.go"
              explanation={
                <>
                  <p>Go</p>
                  <p className="mt-2">
                    This code facilitates use of an Elasticsearch instance. Data
                    can be lost when unmarshalling from json into a struct: a
                    resulting value of 0 could have originally been 0, or null.
                    A custom unmarshaller could convert values into pointers
                    (nil pointer corresponding to null), or all values could be
                    converted into a tuple (value, valid). In this case the
                    payload was designed such that there is no difference in
                    meaning between 0 and null, or groups of values are sent
                    with an explicit 'valid' field. This solution is readable
                    and understandable between services, but I would use gRPC in
                    future.
                  </p>
                </>
              }
              content={
                <div className="w-fit p-4 text-orange-300">
                  <pre>
                    <code>{goCodeSample}</code>
                  </pre>
                </div>
              }
            />
            <DemoCard
              ref={contentRef4}
              link="https://drawsql.app/teams/none-1579/diagrams/swanduckgoose"
              explanation={
                <>
                  <p>SQL</p>
                  <p className="mt-2">
                    This schema is for a document management system, implemented
                    using a Supabase backend. People have roles and belong to
                    organizations, some can make documents and manage users
                    while others can only read documents. Exactly who has read
                    what version of a document is important.
                  </p>
                  <p className="mt-2">
                    The relationships are; users, organizations, and roles;
                    documents belonging to an organization; memberships which
                    connect a user to an organization with a role; invitations
                    which can turn into a membership; old documents which are
                    exact copies created automatically everytime a document is
                    modified; and finally document downloads (aka reads).
                  </p>
                  <p className="mt-2">
                    Supabase is closely integrated with Postgres. The validity
                    of the documents can be preserved by using a combination of
                    triggers and row-level-security (aka row security policies).
                  </p>
                </>
              }
              content={
                <div className="hover-control-opacity flex h-full w-full items-center justify-center p-2 opacity-95 md:p-0 md:opacity-60">
                  <img src={erd} alt="ERD" />
                </div>
              }
            />
            {/* <DemoCard
              ref={contentRef5}
              link="TODO"
              explanation={
                <>
                  <p>Math, just for fun</p>
                  <p className="mt-2">
                    I wanted some big, custom art for my apartment. Enter the
                    wall plotter: a marker suspended by two wires each on a
                    motorized spool, attached to the upper corners of a
                    whiteboard. There are a bunch of examples out there; I
                    wanted mine to be cheap.
                  </p>
                  <p className="mt-2">
                    After scoping out all the hardware, I started to write some
                    code for parsing SVGs into motor moves. Neither the motors
                    nor my eyes are as precise as an SVG path, so a naive
                    down-sampling algorithm (take a point every ~2mm along the
                    path) worked well, but there was room for improvement.
                  </p>
                  <p className="mt-2">
                    I came up with the following algorithm, which: discards
                    points residing inside straight lines, discards small
                    aberrations, preserves sharp corners, and preserves gradual
                    curves. It incorporates the naive down-sampling algorithm as
                    well, so corners are not 100% precise, but they're close
                    enough. Now there are far fewer points to consider in later
                    stages (like when converting cartesian coordinates to
                    pseudo-polar), which cuts down on computation time.
                  </p>
                </>
              }
              content={
                <div className="left-0 p-4 md:w-1/2">
                  <ol className="[&>*]:mt-2 [&_code]:text-orange-300">
                    <li className="!mt-0">
                      1. Pick an initial precision value <code>pvi</code>, and a
                      step value <code>sv</code>. Set{" "}
                      <code>precision = pvi</code>.
                    </li>
                    <li>
                      2. Define function <code>FD(x,p)</code> such that when
                      given a point <code>x</code> on path <code>p</code>, it
                      returns the distance from <code>x</code> to the start of{" "}
                      <code>p</code>, measured along the path <code>p</code>.
                    </li>
                    <li>
                      3. Pick points <code>A</code> and <code>B</code>, both on
                      path <code>P</code>, where <code>FD(A,P) = 0</code> and{" "}
                      <code>FD(B,P) = sv</code>.
                    </li>
                    <li>
                      4. Find point <code>C</code> on path <code>P</code>, such
                      that <code>FD(C,P) - FD(B,P) = sv</code>. If remaining
                      path is too short; save <code>A</code> and <code>B</code>{" "}
                      to a buffer, then exit.
                    </li>
                    <li>
                      5. Calculate the shortest distance <code>dl</code> from
                      point <code>B</code> to the line <code>AC</code>.
                    </li>
                    <li>
                      6. If <code>dl</code> is less than <code>precision</code>;
                      set <code>B = C</code>, set{" "}
                      <code>precision = precision / 2</code>, then go to step 4.
                    </li>
                    <li>
                      7. Else if <code>dl</code> is greater than or equal to{" "}
                      <code>precision</code>; save point <code>A</code> to a
                      buffer, set <code>A = B</code> and <code>B = C</code>, set{" "}
                      <code>precision = pvi</code>, then go to step 4.
                    </li>
                  </ol>
                </div>
              }
            /> */}
          </div>
        </div>
      </div>
      <div className="flex min-w-full justify-center">
        <div className="my-8 w-full max-w-screen-md px-4">
          <h2 className="mb-4 text-center text-2xl">Future Plans</h2>
          <p>1. Add more just for fun projects</p>
          <p>2. Add a "What I'm Reading" section</p>
        </div>
      </div>
    </>
  );
}

export default App;
