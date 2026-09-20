// Reflections. DK's essays, brought over from her Drive drafts on 20 September 2026 and set to house style:
// NO GraGra spelt with the space, no em dashes, British spelling. Newest first.
// Bodies are HTML so headings, pull quotes and pictures survive; the essay page styles them with .article-body.

export type Article = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string | string[];
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
};

const figure = (src: string, alt: string) =>
  `<figure><img src="${src}" alt="${alt}" loading="lazy" /></figure>`;

export const articles: Article[] = [
  {
    slug: "ojoro-cancel-ojoro",
    title: "Ojoro Cancel Ojoro",
    date: "3 August 2026",
    readTime: "15 min read",
    image: "/assets/avenzor/images/essay-02-pitch.webp",
    excerpt:
      "On shortcuts, speed, and the difference between the work you can skip and the work that is quietly becoming you.",
    categories: [{ name: "NO GraGra", slug: "no-gragra" }],
    body: `
<h2>One · The penalty box</h2>
<p><strong>Somebody trips in the box.</strong></p>
<p>You know the scene even if you have never played. Somebody goes down in the penalty area, arms out, appealing. And before the referee can decide anything, half the pitch is already shouting.</p>
<p>Because it turns out the man who fell had been holding a shirt thirty seconds earlier. And the man who fouled him had been offside before that. Everybody has done something. Everybody saw everybody.</p>
<p>So the verdict arrives, and it arrives from the players, not the referee: <strong>ojoro cancel ojoro.</strong></p>
<p>You cheated. I cheated. They cancel. Play on.</p>
<p>And everybody agrees, because everybody is implicated, and the game continues, and somebody scores at the other end eight minutes later and it is forgotten.</p>
<p>But I want to stop the tape there, because there is a question underneath that nobody in the box is asking.</p>
<p><strong>What actually got settled?</strong></p>
<p>Nothing. Not one thing. Two wrongs did not become right. They became <em>unexamined</em>. The cancellation was a social agreement to stop looking. It let the game go on. It did not make anybody a better player.</p>
<p>That is the phrase I have been carrying for a while now, and I have come to think it describes something much larger than football.</p>
<blockquote>Ojoro cancel ojoro is not a resolution. It is an agreement to stop looking.</blockquote>

<h2>Two · Can I be honest</h2>
<p><strong>Can I be honest? Don't answer that.</strong></p>
<p>Because somewhere right now, someone is paying for knowledge they have no intention of using, and calling it an investment.</p>
<p>I saw a comment on TikTok a while ago that stopped me mid-scroll. Someone was in the replies of a digital marketing course creator, frustrated that the course <em>hadn't worked</em>. Hadn't worked. As in: they had bought it. They just hadn't done it.</p>
<p>And listen, I am not here to shame anybody. Life gets busy. Tabs stay open. Good intentions are genuinely real, and I have a folder of them.</p>
<p>But there is a specific kind of magical thinking that has taken root, and it goes like this:</p>
<p><strong><em>If I pay for the thing, I become the thing.</em></strong></p>
<p>Credibility does not work like that. Neither does skill. Neither does judgement. And I stayed with that comment much longer than it deserved, because I recognised something in it that I did not want to recognise.</p>
<p>The person in that comment section was not lazy. That is the part everybody gets wrong. They had found the course. They had paid for it. They had shown up in the replies to complain, which is itself work, of a kind.</p>
<p><strong>They were not avoiding effort. They were avoiding a particular kind of effort.</strong> And I know exactly which kind, because it is the same kind I avoid.</p>

<h2>Three · The word</h2>
<p><strong>Ojoro is a Yoruba word that came into Pidgin and never left.</strong></p>
<p>Òjóró. Cheating. Fraud. Foul play. It travelled from Yoruba into Nigerian Pidgin the way a lot of our best words did: sideways, through the street and the pitch and the playground, picking up texture as it went.</p>
<p>It lives most vividly in football. <em>That ref dey do ojoro.</em> It is not a courtroom word. It is not formal. It is the word you shout, and that matters, because the phrase belongs to games, to the places where rules are held by the people playing rather than by an institution.</p>
<p>Which is precisely why <strong>ojoro cancel ojoro</strong> exists as a rule at all.</p>
<p>When there is no referee, or the referee has lost the room, you need a mechanism for continuing. Somebody cheated, somebody else cheated, and rather than unpick it, you cancel and play on. It is a genuinely elegant piece of social engineering. It keeps the game alive.</p>
<p>But notice what it does. It is a rule for <strong>dissolving consequence</strong>. Its whole function is to make sure nobody has to answer for anything.</p>
<p>And a rule like that is fine for a Saturday afternoon.</p>
<p>It is a catastrophe for a life.</p>

<h2>Four · A necessary correction</h2>
<p><strong>I want to be very clear: I am not against shortcuts.</strong></p>
<p>Let me say this early, because otherwise you will read the rest of this as a lecture about diligence, and it isn't one.</p>
<p>I take shortcuts. Constantly. I have a body that requires it. There are days when my hundred per cent is thirty minutes, and thirty minutes does not permit the scenic route. I have built an entire practice on the premise that most struggle is unnecessary and should be engineered out.</p>
<p>The name of my philosophy is <strong>NO GraGra</strong>. No unnecessary struggle. No frantic grabbing. If there is a faster way and it does not cost you anything real, take the faster way. Please. Somebody has already solved it; use their solution. That is not cheating, that is literacy.</p>
<p>So no, this is not an essay about how you should be suffering more.</p>
<p>It is an essay about <strong>which struggle was necessary</strong>, and the fact that we have almost entirely lost the ability to tell.</p>
<p>Because here is what I notice about the word <em>unnecessary</em>. It is doing enormous work in my own philosophy, and it is the word everybody skips over. NO GraGra does not say <em>no struggle</em>. It says no <em>unnecessary</em> struggle. Which requires you to have decided, on purpose, which struggle was load-bearing.</p>
<p>Most people have never made that decision. They have just noticed that struggle is unpleasant and optimised accordingly.</p>

<h2>Five · The line</h2>
<p><strong>You can shortcut the doing. You cannot shortcut the knowing.</strong></p>
<p>This is the whole distinction and it took me an embarrassingly long time to arrive at it.</p>
<p><strong>A shortcut in execution</strong> saves you effort on something you already understand.</p>
<p><strong>A shortcut in formation</strong> saves you the understanding itself.</p>
<p>The first one is intelligence. The template, the tool, the delegation, the person who has done it before: all of that is you refusing unnecessary struggle, and it is correct.</p>
<p><strong>The second one is ojoro.</strong> And it does not feel any different in the moment. That is the trouble. Both feel like efficiency. Both feel clever. Both produce something you can show people by Friday.</p>
<p>So here is the test I use, and it takes about four seconds.</p>
<p><strong>Could I rebuild this without the shortcut?</strong></p>
<p>If yes, it was efficiency. You own the thing; you simply declined to do it the slow way this time.</p>
<p>If no, you did not build anything. You <em>rented a result</em>, and the rent is still running.</p>
<p>The template you could have written yourself is a tool. The template you could not have written yourself is a costume.</p>
<p>Same file. Completely different object. And only you know which one you are holding, which is why nobody else can catch this for you.</p>
${figure("/assets/avenzor/images/essay-02-bricks.webp", "Hands laying the first course of bricks on a foundation, a spirit level resting on them")}

<h2>Six · The microwave</h2>
<p><strong>We were sold speed, and we bought it wholesale.</strong></p>
<p>I want to be fair to my generation and the one behind it, because the appetite did not come from nowhere. It was sold to us, relentlessly, by people with something to gain.</p>
<p>Six figures in six months. Ten thousand followers in thirty days. The five-step system. The one thing that changed everything. <em>Just do this, and it will come.</em></p>
<p>And the reason that promise works, the reason it will keep working long after this essay, is that <strong>it is not entirely a lie.</strong> That is what makes it so difficult to argue with.</p>
<p>Some things really are that fast now. Distribution is fast. Publishing is fast. Finding your first ten customers is faster than it has ever been in the history of commerce. The tools are extraordinary and I use all of them.</p>
<p>The lie is not that speed exists. <strong>The lie is that speed generalises.</strong></p>
<p>We watched the delivery mechanism get faster and we concluded that everything got faster. But the things that got faster were all <em>transmission</em>: getting a thing from here to there. Nothing about formation changed. Judgement still takes the same number of years it took your grandmother. Taste still requires being wrong publicly a hundred times. Knowing which client to decline still requires having accepted the wrong one and lived through it.</p>
<p>You cannot download that. There is no version of that available on a payment plan.</p>
<p>So we have ended up with a generation of people, and I include myself, who can <strong>deliver faster than they can think</strong>. Who have world-class transmission attached to under-built judgement. And the gap between those two things is exactly where ojoro lives.</p>
<blockquote>Everything about delivery got faster. Nothing about becoming got faster at all.</blockquote>

<h2>Seven · The thing nobody says</h2>
<p><strong>The person doing ojoro is working extremely hard.</strong></p>
<p>This is the part I most want you to take, and it is the reason this essay is not about discipline.</p>
<p>We picture the shortcut-taker as idle. Lounging. Waiting for it to fall in. That person barely exists.</p>
<p>The person doing ojoro is <strong>exhausted</strong>. She is up at six. She has three drafts of the offer. She has rebuilt the website twice this quarter and redesigned the logo again. She is posting daily. She is in four communities. She has bought the course, and the second course, and she is genuinely, visibly, admirably busy.</p>
<p>She is doing <strong>gragra</strong>, and it is worth knowing that gragra is a Yoruba word too, <em>gìrà gìrà</em>, that came into Pidgin exactly the way ojoro did. Frantic, forceful, showy motion. All the flash. Sparkle everywhere.</p>
<p>And underneath all of it, the two or three basic things she is actually supposed to be doing have not been touched in eleven months.</p>
<p>So gragra and ojoro are not opposites. <strong>They are the same person.</strong> They are what one person looks like from the outside and the inside on the same afternoon.</p>
<p>And once you see why, you cannot unsee it: <strong>effort goes where the feedback is fastest.</strong></p>
<p>Redesigning the logo gives you a result in an hour. Getting genuinely better at the thing you sell gives you a result in eighteen months, quietly, with nobody clapping. Of course the effort migrates. It is not a character flaw. It is a perfectly rational response to a system that only rewards what it can see immediately.</p>
<p>Which is why willpower has never once fixed this, and why I stopped treating it as a discipline problem years ago. You do not have a motivation deficit. <strong>You have effort pointed at the visible thing and absence at the invisible one</strong>, and the invisible one is the one becoming you.</p>

<h2>Eight · The mechanism</h2>
<p><strong>It doesn't cancel. It defers.</strong></p>
<p>Back to the penalty box, because now we can answer the question properly.</p>
<p>Ojoro cancel ojoro promises symmetry. Two wrongs, neutralised, nobody owes anything. And in a football match that is roughly true, because the match ends at ninety minutes and the cheating does not compound.</p>
<p>Your work is not a match. Your work is a structure, and structures have <strong>load</strong>.</p>
<p>The foundational skills are not a stage you pass through and leave behind. They are the substrate every later thing rests on. Which means when you skip one, you have not removed it from the building. <strong>You have moved it to a later date, and added interest.</strong></p>
<p>And here is the cruelty of the timing. The bill never arrives while things are small and quiet and easily fixed. It arrives at scale. It arrives when you finally have the room, the client, the platform, the contract you spent four years trying to get.</p>
<p>The pricing conversation you avoided learning at three clients arrives at thirty, in front of somebody who matters.</p>
<p>The fundamentals you skipped because the shortcut worked arrive on the one project where the shortcut does not apply.</p>
<p>The hard conversation you have never had once arrives with someone who can end you.</p>
<p>And it is always harder then. Not marginally. <strong>Categorically</strong> harder, because now you are learning a foundational skill under load, in public, with consequences attached, at an age where people assume you already know. There is no beginner's grace left. You used it. You spent it on the years when nobody was watching and you were doing gragra instead.</p>
<p>That is what I mean when I say ojoro makes the work more difficult later. Not as a warning. As <em>arithmetic</em>.</p>

<h2>Nine · The boring work</h2>
<p><strong>And yes, it is genuinely boring. I'm not going to pretend otherwise.</strong></p>
<p>There is a version of this essay that tells you the foundational work is secretly thrilling if you approach it with the right mindset. That version is dishonest and you would know immediately.</p>
<p><strong>It is boring.</strong> That is not a framing problem. That is the actual texture of it.</p>
<p>It is the same handful of things, repeatedly, without applause, for a length of time nobody specifies in advance. It is unwitnessed. It has almost no feedback loop, which means for long stretches you cannot tell whether it is working. And that, not the tedium, is the genuinely hard part. Boredom you can sit through. <strong>Uncertainty about whether the boredom is productive is what makes people leave.</strong></p>
<p>It also looks like nothing. There is no post in it. You cannot show anybody. And in an economy where visibility functions as proof of life, work that produces nothing visible feels perilously close to not existing.</p>
<p>So people do not skip the boring work because they are weak. They skip it because it is the only work that offers no evidence you are doing it.</p>
<p>Naming that honestly is the only thing that has ever helped me. Not motivation. Motivation is for things that are interesting. <strong>You do not need to want to do it. You need to have decided that it is load-bearing, and then stopped renegotiating.</strong></p>
<p>Slow first. Then precise. The order has never been decorative. It is the instruction. Precision is what the slow part <em>produces</em>, and if you take the slowness out you do not get precision faster. You get speed with nothing underneath it.</p>

<h2>Ten · What it actually costs</h2>
<p><strong>You cannot own what you did not build.</strong></p>
<p>This is where it stops being about productivity, and becomes the thing I actually care about.</p>
<p>Everything I do sits on one distinction: independence is freedom <em>from</em>. Autonomy is ownership <em>of</em>. And ownership is not a feeling. It is the position of being the one who decides, and who can answer for it.</p>
<p>Which means <strong>ojoro does not cost you a result. It costs you the ownership of the result.</strong></p>
<p>Look at what you can and cannot do with a rented outcome. You cannot adapt it, because you do not know which parts were load-bearing. You cannot defend it, because you cannot explain why it is built that way. You cannot rebuild it when it breaks, and it will break, because everything does. And you cannot teach it, which is the cleanest test I know: <strong>you can only teach what you actually built.</strong></p>
<p>So the person who bought the course and did not do it did not fail at discipline. They did something more specific. <strong>They attempted to purchase a version of themselves.</strong></p>
<p>And you cannot buy that. Not because the universe is stern about it, but because there is no transaction that installs judgement. Judgement is the residue of having done a thing badly and stayed to find out why.</p>
<p>Which is exactly why the boring work is not a tax on autonomy. It <em>is</em> autonomy: the part where you become someone who can decide, rather than someone waiting for the next person with a system.</p>
<p>Skip it and you stay in the position I have written about before: outsourced. Not lost. Not lazy. Just permanently dependent on whoever built the thing you are standing on, because you never learnt to build it and cannot fix it when it goes.</p>

<h2>Eleven · The box, again</h2>
<p><strong>Play on. But somebody still can't defend.</strong></p>
<p>Return to the penalty area one last time. Everybody is shouting. Ojoro cancel ojoro. The referee waves it away. The game continues, and honestly, it should. You cannot stop a match every time someone is dishonest.</p>
<p>But nothing was settled and everybody knows it. Nobody learnt anything. And the man who has been cheating all season, quietly, in small ways, because he never properly learnt to defend: <strong>he still cannot defend.</strong> The cancellation covered it for another week. It did not teach him.</p>
<p>Eventually he plays somebody good, and there is no shirt to hold, and it is all visible at once.</p>
<p>So I am not telling you to stop taking shortcuts. Take them. Take more of them than you currently do. Most struggle really is unnecessary and you are probably suffering through things a template would solve this afternoon.</p>
<p>I am telling you to know <strong>which</strong> struggle you are removing.</p>
<p>Skip the effort. Never skip the formation. And when you cannot tell the difference, which is most of the time, because they feel identical, ask the four-second question. <em>Could I rebuild this without it?</em></p>
<p>Everything you can rebuild, you own. Everything else, you are renting.</p>
<p>And the rent is still running.</p>
<ol>
<li>What is the boring work I have been doing gragra to avoid?</li>
<li>Which of my results could I not rebuild from scratch, and what happens when that one breaks?</li>
<li>What did I once decide was unnecessary struggle, that was actually the whole thing?</li>
</ol>
<p><em>Ojoro</em>, from the Yoruba <em>òjóró</em>: cheating, foul play. <em>Gragra</em>, from the Yoruba <em>gìrà gìrà</em>: frantic, forceful motion.</p>
<p><em>Written slowly. As it should be. NO GraGra: slow first, then precise.</em></p>
`,
  },
  {
    slug: "i-wanted-independence-i-needed-autonomy",
    title: "I Wanted Independence. I Needed Autonomy.",
    date: "26 July 2026",
    readTime: "16 min read",
    image: "/assets/avenzor/images/essay-01-gate.webp",
    excerpt:
      "On the difference between freedom from and ownership of, and what the wrong word cost me for twenty years.",
    categories: [{ name: "Autonomy", slug: "autonomy" }],
    body: `
<h2>One · The gate</h2>
<p><strong>I was the child who climbed the gate.</strong></p>
<p>Not because there was no other way in. There was a way in. There is always a way in. I climbed because <strong>the climb was mine.</strong></p>
<p>Nobody in my family would describe that child as sensible. Curious, yes. Stubborn, definitely. Misunderstood, constantly. I asked too many questions and I asked them in the wrong order and I asked them of adults who had already decided what the answer was. I was ten when I read the Famous Five and knew immediately, with the certainty children have about themselves, that I was George. Not the girl who was good. The one who wanted to know.</p>
<p>And when there was a gate, I went over it.</p>
<p>I have thought about that gate for years without knowing why it kept coming back. Then, writing about my childhood recently, it landed. It wasn't about the gate at all. It was about who was holding the controls.</p>
<p>Because here is what I discovered when I looked properly: <strong>I never stopped being adventurous.</strong> I stopped enjoying adventures where somebody else decided the route. Somewhere between the gate and adulthood I learnt to be carried. To be advised. To be managed. To be told which door, which timeline, which version of a life was the credible one. And I called that growing up.</p>
<p>The risk never left. On a gate there is real risk. You can fall. What left was the <em>agency</em>, the part where the risk was mine because the choice was mine.</p>
<p>That is the whole essay, honestly. But let me take the long way, because the long way is where the work is.</p>
<blockquote>It was never about climbing alone. It was about choosing my own climb.</blockquote>

<h2>Two · The song</h2>
<p><strong>The word I was handed was independence.</strong></p>
<p>I did not choose it. It was in the air.</p>
<p>If you were a young woman coming up when I was coming up, Nigerian, ambitious, watching your mother and your aunties and every woman who had ever been let down by a system or a person, then <strong>independence was the highest compliment available.</strong> It had a soundtrack. It had a whole song. The independent woman: buys her own, pays her own, needs nobody, asks for nothing, carries everything.</p>
<p>And I want to be careful here, because that word did real work. For a generation of women it was a survival instruction, and it kept people alive and housed and educated. I am not sneering at it. I inherited it from women I respect enormously.</p>
<p>But I want to say the quiet part.</p>
<p><strong>Independence was a standard handed to me from outside.</strong> I never sat down and decided it. I absorbed it, the way you absorb an accent. And any standard you absorb without examining is a standard that can hold you captive while you are congratulating yourself for being free.</p>
<p>That is the trap, and it is a beautifully designed one. Independence <em>looks</em> exactly like freedom. It has all the surface features. Competence. Self-sufficiency. Not needing. The absence of visible dependence.</p>
<p>What it doesn't have is <strong>consent</strong>. Nobody ever asked me whether I wanted that life. I was too busy performing it well to notice I had never agreed to it.</p>

<h2>Three · The distinction</h2>
<p><strong>Independence is freedom <em>from</em>. Autonomy is ownership <em>of</em>.</strong></p>
<p>Say it slowly, because the whole shift lives in two prepositions.</p>
<p><strong>Independence asks:</strong> Who do I not need?</p>
<p><strong>Autonomy asks:</strong> Who is deciding?</p>
<p>Independence is defined by <strong>absence</strong>. It is a subtraction. Freedom from a person, a boss, a household, a body's limitations, a place. Which means independence always needs something to be free of. It requires an opponent. Take the opponent away and independence has nothing to describe itself against.</p>
<p>Autonomy is defined by <strong>authorship</strong>. It is not a subtraction, it is a claim. It says: this life has an owner, and the owner is me. Not because I built it alone. Because I am the one who decides, who is accountable, who carries the consequence and the credit.</p>
<p>You can be independent and completely captive. I have met her many times. She has her own income, her own flat, her own car, her own opinions on paper, and every significant decision in her life was made by somebody else's timeline. Her father's ambition. Her industry's definition of serious. A pastor's certainty. A market. An algorithm. Twelve people on the internet whose names she doesn't know.</p>
<p>She is free from everyone. She is the author of nothing.</p>
<p>And you can be deeply, visibly dependent and completely autonomous. Supported. Coached. Carried on the hard days. Needing help and asking for it out loud. And still the author. Still the one deciding.</p>
<p>Which means, and this is the line I keep coming back to, <strong>autonomy is not about who is around you. It is about who is deciding for you.</strong></p>

<h2>Four · Twenty years</h2>
<p><strong>I spent two decades chasing a body I used to have.</strong></p>
<p>Here is where it stops being philosophy.</p>
<p>For a very long time I was unwell without a name for it. Not misdiagnosed. That would at least have been a label to argue with. <strong>Undiagnosed.</strong> Years of it. Multiple countries, multiple doctors, multiple waiting rooms, and the same sentence handed back to me in different accents: <em>there's nothing wrong.</em></p>
<p>I learnt to be my own detective in those rooms. I learnt to keep asking after the professionals had stopped. That skill has become half of what I do for a living now, which is one of those jokes life makes.</p>
<p>But underneath the investigating, there was a story I was telling myself, and the story was about independence.</p>
<p>I believed there would be a moment. A diagnosis, a treatment, a good year, and I would be <em>returned</em>, handed back the body I had before, the one that could work fourteen hours, travel on a Tuesday, say yes on instinct. I was chasing "getting better." And what I meant by better was <strong>a return to self-sufficiency</strong>. Independence from my own limits.</p>
<p>That is a bet. And I want to name it as one, because I made it for twenty years. It is the gamble where you stake your entire present on a future version of yourself who may never arrive, and you call the staking "hope" so that nobody can question it.</p>
<p>Nothing about that bet was free. I was living on deferred permission. Not now, not yet, not in this body. <em>Later</em>, when I'm better, then I'll build the thing.</p>
<p>The turn, when it finally came, was embarrassingly small. I stopped chasing. And I started <strong>owning</strong>.</p>
<p>Not accepting, exactly. Accepting is too passive a word and people use it to mean giving up. Owning. As in: this is the body. These are the actual hours. This is what Tuesday can hold. Now, <em>what do I build with that?</em></p>
<p>Some days my hundred percent is thirty minutes. Thirty real minutes. I make them count, or I am simply fully present wherever I am, and that is the day.</p>
<p>Independence could never have given me that. Independence would have called those thirty minutes a failure, because independence measures me against a standard I did not set. <strong>Autonomy measures me against my own consent.</strong> Did I choose this? Am I the one deciding? Then it counts.</p>
<blockquote>Freedom that cannot survive a flare, a bad week, or a season where your body says no was never freedom. It was performance.</blockquote>

<h2>Five · Four costumes</h2>
<p><strong>Independence rarely announces itself. It wears something.</strong></p>
<p>If it turned up plainly, we would all recognise it. It doesn't. It arrives dressed as maturity, as ambition, as healing, as freedom itself. These are the four I know intimately, because I have worn all of them.</p>
<h3>Costume 01 · The Fixer</h3>
<p>Independence as being the one who never needs. She is the person everybody calls and who calls nobody. Her competence is real. That is what makes it so hard to see. But she has built an identity on being unneedy, which means <strong>asking has become a threat to who she is.</strong> She isn't free. She is on duty.</p>
<h3>Costume 02 · The Hustler</h3>
<p>Independence as income. She left the job, so surely she is free. But she has replaced one boss with forty, her calendar is written by whoever pays fastest, and her prices were set by what she thought she could get away with. Self-employed and <strong>fully outsourced</strong>. This one nearly finished me. Hustle culture is independence in its purest form: an enormous amount of motion, almost no ownership.</p>
<h3>Costume 03 · The Escapee</h3>
<p>Independence as leaving. New city, new church, new industry, new circle. And it works, for about eight months. Then the same pattern reassembles itself with new faces, because <strong>she changed the room, not the authorship.</strong> Escape is not the same as ownership. Escape still lets the thing you left define your direction. You are just travelling in the opposite direction from it.</p>
<h3>Costume 04 · The Improver</h3>
<p>The most sophisticated of the four, and the hardest to name, because it looks like growth. She reads everything. She has done the courses, the programmes, the diagnostics, the retreats. But she is optimising toward a self <strong>she never chose</strong>. Every framework she adopts came from outside and she never asked whether she agreed with its destination. More information has never once produced ownership. I say this as someone who builds frameworks for a living.</p>
<p>All four are capable. All four are admired. And all four are captive, which is why I stopped calling this problem a confidence problem or a strategy problem. It is a captivity problem. And most of it is <strong>hidden</strong>, including from the person living inside it.</p>

<h2>Six · The case</h2>
<p><strong>You are not lost. You are outsourced.</strong></p>
<p>This is the sentence that does the most work in my practice, and people tend to go quiet when they hear it.</p>
<p>Lost implies you have no idea where anything is. That is almost never true of the people I work with. They are credible, intelligent, often senior. They know their field. They know their values if you ask them slowly enough.</p>
<p>What has happened is more specific and more fixable. <strong>Somewhere along the line, they handed over the decision-making on particular parts of their life and never took it back.</strong> Not all of it. Parts. And usually to people who meant well.</p>
<p>I did it with my personal development for years. Everybody was going in a particular direction, so I went in that direction. I outsourced the question of who I was becoming to a crowd, and then I was surprised that <em>I had never worked for the person I actually am.</em></p>
<p>So the question is never "where did I go." The question is: <strong>where has the deciding been handed over?</strong></p>
<p>In my work that lives across five places. Not five topics. Five threads in one cloth. You cannot pull one without the weave moving, and the whole thing frays at whichever thread you stopped tending.</p>
<ul>
<li><strong>Identity.</strong> Whose definition of you are you working for?</li>
<li><strong>Message.</strong> Whose words are in your mouth when you describe what you do?</li>
<li><strong>Strategy.</strong> Whose plan are you executing, and did you ever agree to its destination?</li>
<li><strong>Relationships.</strong> Who has a vote in your life that they were never given?</li>
<li><strong>Resources.</strong> Who set your prices, your hours, your ceiling?</li>
</ul>
<p>Independence has no answer to any of those questions. It cannot even hear them. It is too busy proving it needs nobody. The five questions all assume you are surrounded by people. They only ask <strong>who is holding the pen.</strong></p>
${figure("/assets/avenzor/images/essay-01-pen.webp", "A woman's hand picking up a fountain pen from an open notebook")}

<h2>Seven · The turn</h2>
<p><strong>My first real act of ownership looked like disobedience.</strong></p>
<p>I had a PhD place. I had my father's expectation, which in my family is not a light object. And I deferred, and I stayed in the UK, and I did it knowing exactly how it would land.</p>
<p>For a long time I filed that under rebellion. It took me years to understand it was something else entirely, and the difference matters more than it sounds.</p>
<p><strong>Rebellion is still reactive.</strong> Rebellion needs the thing it is rebelling against in order to know what to do next. It is independence's younger sibling: same logic, louder clothes. If your only move is the opposite of what you were told, you are still being directed. Someone else is still setting the agenda; you have just inverted their instructions.</p>
<p>Ownership doesn't need an opponent. Ownership says: I have considered this, I know the cost, I am choosing, and the consequence is mine to carry. Nobody to defy. Nobody to convince.</p>
<p>That is why the truest tell of autonomy is not defiance. It is <strong>the willingness to be accountable when it goes wrong.</strong></p>
<p>Here is my own test, and I use it on myself. If I hire a coach and I do not earn what I set out to earn, the question is not what the coach failed to give me. The question is what I did and did not do. That is not self-blame. Self-blame is another performance. It is ownership. And it is only available to me because I chose the coach, chose the goal, chose the terms.</p>
<p>Nobody can be accountable for a decision they never made. Which is why <strong>outsourced people cannot take ownership even when they desperately want to</strong>. There is nothing there to own yet. You have to take the decision back first. Accountability comes second, always.</p>

<h2>Eight · The correction</h2>
<p><strong>Autonomy is not a solo act. Let me be very clear about this.</strong></p>
<p>Every time I say the word, somebody hears "alone." I understand why. We have spent decades using freedom and self-sufficiency as synonyms, so any word in that neighbourhood sounds like a door closing.</p>
<p>So plainly: <strong>autonomy does not mean working in isolation.</strong> It does not mean needing no one. It does not mean refusing help, doing without support, or treating interdependence as a weakness to be managed.</p>
<p>I have a coach. I have people who hold me to things. I have a practice built on the assumption that thinking gets sharper in company, not in a locked room. I have a body that requires other people some weeks, and I have stopped experiencing that as a defeat.</p>
<p>None of that costs me a gram of autonomy, because <strong>autonomy is not measured at the boundary of your life. It is measured at the point of decision.</strong></p>
<p>You can be held by twenty people and be the author.</p>
<p>You can be admired by two thousand and be a tenant in your own life.</p>
<p>The difference is not the number of people in the room. It is whether, when the room clears, the decision still belongs to you.</p>

<h2>Nine · Why it must be slow</h2>
<p><strong>You cannot rush your way into owning something.</strong></p>
<p>My philosophy has a name I did not invent so much as inherit and sharpen: <strong>NO GraGra</strong>. No unnecessary struggle. No frantic grabbing. Slow first, then precise.</p>
<p>People assume that is about pace, or about my health, or about being kind to myself. It is partly about all three. But the real reason runs deeper, and it is structural.</p>
<p><strong>Independence is fast because it is performing.</strong> It has an audience, real or imagined, and audiences reward speed. Look how quickly she recovered. Look how much she carries. Look how little she needs. The performance requires momentum, because the moment you stop moving somebody might see the join.</p>
<p><strong>Autonomy is slow because it is checking with itself.</strong> Every genuine act of ownership requires a pause long enough to ask: do I actually agree with this? And that pause is unbearable when you are performing. It looks like hesitation. It looks like weakness. It is neither. It is the only place a real decision can happen.</p>
<p>So the slowness is not a lifestyle preference. It is the mechanism. <strong>You cannot own a decision you did not have time to make.</strong></p>
<p>This is why I hold decisions now instead of answering in the room. Why I put things in writing and let them sit for a day. Not because I am precious. Because a decision made under pressure belongs to the pressure, not to me.</p>
<p>Precision comes second, and it does come. NO GraGra is not vagueness. Slow first, <em>then precise.</em> The order is the whole instruction.</p>

<h2>Ten · The shift itself</h2>
<p><strong>Nobody arrives at autonomy. You become someone who owns things.</strong></p>
<p>I need to say this because the culture has trained us to expect a moment. A breakthrough, a session, a diagnosis, a decision at 2am that changes everything.</p>
<p>That is not how it went for me, and I have not seen it go that way for anyone.</p>
<p>What actually happens is a sequence, and it is slower and less cinematic than anyone wants:</p>
<p><strong>You think differently.</strong> One assumption cracks. Usually a small one. Usually the word you had been using without examining it.</p>
<p><strong>You do differently.</strong> One decision gets taken back. You reclaim one thing you had handed over: a price, a yes, a Tuesday, a definition of yourself.</p>
<p><strong>You act differently.</strong> The one-off becomes a pattern. Other people start to notice, usually before you do, and some of them do not like it.</p>
<p><strong>You become different.</strong> Not a new personality. The same person, now holding the pen. Which is, I think, what people mean when they say someone seems settled. The search has stopped because the authorship has been resolved.</p>
<p>I have been at this since 2016 and I would not call myself finished. I still catch myself outsourcing. The difference is that now I catch it, and catching it early is most of the skill.</p>

<h2>Eleven · The gate, again</h2>
<p><strong>The child on the gate already knew.</strong></p>
<p>She wasn't proving anything. There was no audience. That came later. She just preferred the version of the journey where the choosing was hers, even though it was harder and there was a genuine chance of falling.</p>
<p>Everything I have built since is an attempt to get back to her thinking. Not her body, not her circumstances, not her ignorance of what was coming. <strong>Her relationship to the controls.</strong></p>
<p>So if you take one thing from this, let it be the swap. Because a word you never chose can run your entire life, and this is the one I'd change first.</p>
<p><strong>Stop asking how to be free from things. Start asking what you own.</strong></p>
<p>Independence will tell you that you need less. It is a subtraction, and it will keep subtracting until there is very little of you left in the room.</p>
<p>Autonomy asks for something harder and better: that you take the pen back. On your identity, your message, your strategy, your circle, your resources. Not all at once. Slow first.</p>
<p>Then precise.</p>
<p>Three questions, if you want somewhere to begin. Sit with them. Don't answer them quickly. That would rather miss the point.</p>
<ol>
<li>Which decision in my life am I still executing on someone else's behalf?</li>
<li>What am I calling freedom that is actually just distance?</li>
<li>If nobody were watching, what would I choose, and what does it say that I know the answer?</li>
</ol>
<p><em>Written slowly. As it should be. NO GraGra: slow first, then precise.</em></p>
`,
  },
  {
    slug: "three-levels-of-captivity",
    title: "Three Levels of Captivity",
    date: "11 May 2026",
    readTime: "8 min read",
    image: "/assets/avenzor/images/essay-03-desk.webp",
    excerpt:
      "Hidden captivity does not look like failure. It looks like ambition, responsibility and strength. Here is the structure underneath, and how to see it.",
    categories: [{ name: "Hidden captivity", slug: "hidden-captivity" }],
    body: `
<p>You look successful. Everyone thinks you have it figured out. You've built a real life. You have a career. You have achievements. You have a reputation.</p>
<p>But something doesn't fit.</p>
<p>You're building a life that isn't quite yours, and you can't name why.</p>
<p>Hidden captivity doesn't announce itself. It doesn't look like failure. It looks like ambition. Responsibility. Strength. But there's a structure underneath, and once you see it, you can't unsee it.</p>
<p>I've diagnosed this structure in hundreds of capable professionals. It works the same way every time. There are three levels where captivity operates, and most people are trapped across all three without knowing it.</p>

<h2>The three levels</h2>
<h3>Impact level · What you actually want</h3>
<p><strong>What this is:</strong> the real desire beneath everything. What would be true about your life if nobody was watching. What actually matters to you when you strip away the performance.</p>
<p><strong>What captivity looks like here:</strong> You don't know what you actually want. Or you know, but you don't believe you're allowed to want it. Or you've stopped listening to what you want because it seemed impractical, dangerous, or selfish.</p>
<p><strong>The questions that reveal it:</strong></p>
<ul>
<li>If you had all the resources and zero judgement, what would you build?</li>
<li>If you could start over with the knowledge you have now, what would you do differently?</li>
<li>What do you care about that you've never expressed?</li>
<li>What creative thing have you wanted to do but dismissed because you couldn't monetise it?</li>
</ul>
<p><strong>Real example:</strong> Someone told me they wanted to build More Than Average, a charity that helps average students realise they're capable of more. Since childhood, that's what they dreamed of. That's their heart's desire. But then life happened. A nine-to-five became necessary. So what do they actually do? They focus on the career. They're successful at it. But the real dream, the meaningful work, they're not building that. They're not documenting it. They're not creating the systems.</p>
<p><strong>The cost:</strong> Dissatisfaction that logic can't explain. You're succeeding at the wrong thing.</p>

<h3>Execution level · How you're actually living</h3>
<p><strong>What this is:</strong> not your intentions, but your actions. The systems, rhythms, and structures of your actual life. Who gets your energy and when. What a typical week actually looks like, not what it should look like.</p>
<p><strong>What captivity looks like here:</strong> Your life is built for something other than your real desire. You're reacting, not choosing. You're busy being busy, but you're not achieving the things you actually want.</p>
<p>I see this constantly. You start many projects but never finish them. You're always starting over. You show up consistently for others' goals but inconsistently for your own. You don't even set goals for yourself in certain areas of your life. You're just reactive.</p>
<p>And the guilt comes with it. You know you should be doing something. You know your intentions. But your actions tell a different story.</p>
<p><strong>The questions that reveal it:</strong></p>
<ul>
<li>How do you actually spend your time? Not how do you plan to spend it. How do you actually spend it?</li>
<li>Who are you performing for? Whose decisions are you making?</li>
<li>If you stopped chasing busy, what would change?</li>
</ul>
<p><strong>Real example:</strong> I worked with people in military structures, people with full-time careers, DIY entrepreneurs, and freelancers. One pattern was consistent: they were either fully structured or semi-structured, but in both cases, they weren't making progress on what actually mattered. They'd say, "I don't have time to build this. I'm too busy." But the truth is they were spending their time building someone else's goals. Spending time helping others achieve what they wanted. Not doing the little work on their own dreams.</p>
<p><strong>The cost:</strong> Burnout. The cycle of starting, stopping, and restarting. You never reach the finish line on what matters.</p>

<h3>Optics level · The image you're maintaining</h3>
<p><strong>What this is:</strong> the narrative about yourself. The reputation you're protecting. What would break if people really knew you.</p>
<p><strong>What captivity looks like here:</strong> You're performing a version of yourself. You can't be vulnerable in certain spaces because it would crack the image. The image is more important than the reality. You're afraid of being seen for who you actually are.</p>
<p>When I was diagnosed with autism and began unmasking, I realised how long I'd been protecting an image. People saw me as quiet, accomplished, put-together. But I was hiding chronic illness, neurodivergence, the fact that I struggled where I was supposed to be brilliant. In African culture, sickness is shameful. In church, illness questions your faith. So I performed health. I performed strength.</p>
<p>It wasn't until I spoke publicly about my chronic illness that people close to me were shocked. People who'd known me for years had no idea what I was navigating.</p>
<p><strong>The questions that reveal it:</strong></p>
<ul>
<li>What are you protecting? From whom?</li>
<li>Whose permission do you need to be vulnerable?</li>
<li>If people saw the real you, what would they think?</li>
<li>What story do people tell about you that isn't true?</li>
</ul>
<p><strong>The cost:</strong> Fragmentation. You can't claim your own choices. You're living in two worlds.</p>
${figure("/assets/avenzor/images/essay-03-layers.webp", "Three drawn layers of ground, stacked, with a single gold thread running down through the gaps between them")}

<h2>The gaps · Where the misalignment happens</h2>
<h3>Gap 1 · Impact does not match execution</h3>
<p>You know what you want. Your impact is clear.</p>
<p>But your life is organised for something else entirely.</p>
<p>You want meaningful work and authentic relationships. But you're building career achievement and managing impressions. You want to create something that matters. But you're building a pay cheque and proving something to others.</p>
<p>The result? Success at the wrong thing. You're succeeding at what doesn't matter to you.</p>
<p><strong>The cost:</strong> Dissatisfaction that logic can't explain.</p>

<h3>Gap 2 · Execution does not match optics</h3>
<p>You're executing real, amazing work. But you can't show people the truth about it.</p>
<p>I started my work in 2012. I was managing chronic illness. I was executing real work. But I couldn't show people because things weren't polished yet. And people tell me: show your work. Show people behind the scenes. But the reality was messy. My remote team kept breaking down. I couldn't monitor progress. Some quarters, I'm in bed for three to six weeks. That's not in my control.</p>
<p>So what did I do? I hid it. I performed like everything was fine. I looked like I was still climbing the ladder, still capable, still managing everything.</p>
<p>But I was fragmented. I blamed perfectionism. But really? I was hiding from accountability.</p>
<p><strong>The cost:</strong> You can't be vulnerable about your struggle. You can't claim your own work.</p>

<h3>Gap 3 · Impact looks like optics, the false coherence</h3>
<p>Your stated desire matches the image you're selling. But your actual execution is something different entirely.</p>
<p>It's like the story of someone who went viral on social media for what looked like an organic grassroots idea. Everyone believed in him. People travelled from different cities to support him. We all felt like we were part of something real.</p>
<p>Then an exposé came: he already had a deal with the company. It was a paid marketing campaign the whole time. The optics looked real. The image matched what he said he wanted. But the execution was hidden.</p>
<p><strong>The cost:</strong> Self-deception. You can't see the real problem because the narrative looks right.</p>

<h2>Where this shows up · Three pillars</h2>
<h3>Resources, or time</h3>
<p>Most people tell me: "If I had money, I would do this. If I had the right phone, the right gadgets, I would start."</p>
<p>But the resource that everyone has is time. We all have twenty-four hours. And within those twenty-four hours, how are you accounting for your time? How are you spending it? How are you investing it?</p>
<p>The truth is this: you do have time. You just don't use it to do what you need to do.</p>
<p>The key is this: study the book of you. You must read the book of you more than any other book. And how do you read it? You log your time. You account for how you spend every single day. What you do every day matters.</p>
<p>Time mastery starts with self mastery. When you have self mastery, you're in a better position to succeed. Because you've mastered a resource. And that's when other resources come. You're equipped to properly allocate them.</p>
<p>The way you act when you have one pound is the way you act when you have one thousand pounds. If you don't have discipline with time, you won't have discipline with money.</p>

<h3>Message</h3>
<p>When it comes to building anything in the world, most people feel like they don't know what to do. They're not good enough. They don't have a voice. They don't know where to start.</p>
<p>And they keep saying: I am not enough. I am not good enough. I am not enlightened enough.</p>
<p>But the reality is this: there is so much knowledge in you. What I call your SABI, your unfair advantage. It's about what you know. Your knowledge is based on what you've lived, what you've experienced, your work experience, your lived experience.</p>
<p>A third-class graduate can excel because they still have knowledge and lived experience that transforms them.</p>
<p>You believe a message that isn't true. You believe that because you don't have all the resources and all the connections, you're not thriving. And that's what's keeping you stuck.</p>

<h3>Strategy</h3>
<p>Most people don't have a plan. They don't have a personal operating system. They're operating on every other person's system.</p>
<p>You follow every new trend. Vision boards, vision journeys, prayer journals. Everybody does it, so you do it. But you don't execute. You're reactive, not proactive. You're building on someone else's operating system, not your own.</p>
<p>Build for the person you are. Not the person you wish you were. Understand that there's a way you think. There's something you know. There are resources you have that bring something unique. No one else can bring what you bring.</p>
<p>But by just following, by just showing up to that job, just doing what others tell you to do, we fail to live for ourselves.</p>

<h2>Why this matters</h2>
<p>No one wants to wake up one morning and realise you built someone else's life. The life that everybody told you to build. The life that everybody built for you.</p>
<p>Success begins to feel empty. You're thriving, but it's not yours. Relationships stay surface-level because you're performing. Everyone knows about you, but they don't know you. And you don't even know yourself.</p>
<p>You never discover what you're actually capable of. You don't walk in the fullness of your capacity.</p>
<p>But here's the good news: when you are able to unmask, you can connect with the core of who you are. You get in touch with what truly matters to you. Relationships become real. You've got energy. You've got capacity. You've got a bounce in your step that makes you different.</p>
<p>The depth you can go once you address this: it may not take you twenty years. It may take a shorter period to accomplish what you actually want. And that voice that's been telling you that you can't will start telling you the truth. Because you'll start realising what has held you back.</p>

<h2>The path forward</h2>
<p>This isn't a flaw in you. This is a structure you've built, usually for good reasons. You were protecting yourself. You were adapting. That was intelligent.</p>
<p>But now you can see it. And structures can change.</p>
<p>Not through motivation. Motivation doesn't help you achieve your goals. You don't need another plan. Trust me.</p>
<p>But through structural redesign. Through creating a system that works for the person you are. Not the person you wish you were.</p>
<p>That's what The Autonomy Code does. It maps exactly which pillar is most broken for you. And it shows you the first step to realigning your whole life.</p>
<p>If you want to see which level of captivity you're actually trapped in, and which pillar needs attention first, it starts with <a href="/find-me#practices">the Ownership Scan</a>, so you know where you stand before we begin.</p>
<p>You don't have to figure this out alone.</p>
<p>And you don't have to keep building someone else's life.</p>
`,
  },
  {
    slug: "silence-my-old-friend",
    title: "Silence, My Old Friend",
    date: "22 December 2025",
    readTime: "10 min read",
    image: "/assets/avenzor/images/essay-silence-bench.webp",
    excerpt:
      "In a world where noise is constant, quiet has become something to avoid. Here is what changed when I stopped running from it.",
    categories: [{ name: "Rest", slug: "rest" }],
    body: `
<p>Hello silence, my old friend. In a world where noise is constant and silence is scarce, those words echo with truth. We live in an era of endless notifications, round-the-clock entertainment, and the pressure to always be doing something. Sitting still and doing nothing is so unusual that many people literally fear it. In one study, a majority of participants chose to give themselves a mild electric shock rather than sit alone with their thoughts for fifteen minutes. It seems silence has become something to avoid at all costs.</p>
<p>I know this struggle well. As a neurodivergent person with a racing mind, I used to fill every quiet moment with some stimulation, afraid of boredom and uncomfortable with my own restless thoughts. But over time, I've discovered that silence is not empty or boring at all. It is powerful, healing, and deeply transformative.</p>

<h2>The world is afraid of silence</h2>
<p>Modern society treats silence like a void that must be filled. We've been conditioned to equate noise with productivity and progress, an attitude dating back to the Industrial Revolution. Many people now regard silence negatively, as something boring, uncomfortable or even confronting. Think about it: how often do you reach for your phone to fend off even a moment of boredom? From waiting in line to relaxing at home, we reflexively seek distraction. In one survey, three quarters of Americans said they feel uneasy leaving their phone behind, and nearly half considered themselves addicted to it. These endless distractions signal our discomfort with quiet. By constantly plugging our ears and minds with input, what are we shutting out?</p>
<p>One thing we sacrifice is the chance to reflect and truly process our thoughts. When we fill every spare minute scrolling or multitasking, we miss out on the mental reset that idleness provides. When was the last time you sat and did absolutely nothing? If you can't remember, you're not alone, but you may also be missing something important. Psychologists note that when we never allow our minds to wander, we lose opportunities to reboot our mental health and reconnect with ourselves. We become human doings instead of human beings, perpetually in motion without pausing to reflect on where we're going.</p>
<blockquote>"Ever since the Industrial Revolution, noise has been synonymous with productivity. In all the clamour, we have forgotten the value of quiet." Gordon Hempton, acoustic ecologist</blockquote>
<p>Silence, far from being a void, is in fact full of presence. Hempton wisely said, "Silence is not the absence of something but the presence of everything." In the stillness, subtle things emerge: the quiet sounds usually drowned out, the feelings and ideas we've been suppressing, the clarity that busyness obscures. I've found this to be true in my own life. When I finally stopped running from silence, I began to hear myself think, or as the author Pico Iyer puts it, hear myself not think, giving rise to something deeper than thought. In quiet moments, I can unpack the contents of my mind, sorting through emotions, memories and ideas with greater clarity. Instead of reacting impulsively, I become more contemplative and less quick to jump to conclusions. In short, silence makes me move through the world more intentionally.</p>

<h2>The hidden benefits of quiet</h2>
<p>Beyond the subjective feeling of calm, science shows that silence has tangible benefits for our brains and bodies. In a study on the effects of music, researchers were surprised to find that a brief two-minute pause of complete silence caused participants' heart rate and blood pressure to drop lower than during any type of music, even lower than before the experiment started. In other words, silence was profoundly relaxing, more so than an equivalent period of plain rest.</p>
<p>Even more astonishing, silence may help our brains literally grow. Neuroscientists experimenting on mice discovered that exposing them to two hours of complete silence per day triggered the growth of new neurons in the hippocampus, the brain's centre for memory and emotion. After a week, only the mice that had been given the silent treatment successfully integrated those new brain cells into functional circuits. This suggests that quiet time isn't just mentally refreshing. It might actually spur brain regeneration and preparation for future learning. Silence doesn't just reduce stress; it can actively encourage the brain to rebuild itself.</p>
<p>Consider that for a moment: doing nothing might help make you sharper. It's a powerful counterpoint to the productivity-obsessed mindset. When we allow our brains some quiet time, we create the conditions for insights and growth that constant noise might be suppressing.</p>
<p>Silence also often comes hand in hand with boredom, and that's not a bad thing. Psychologists talk about boredom as a variety-driving emotion. It pushes us to seek new and different experiences once we've given the mind a rest. Studies have found that people who first did a mundane, boring task went on to perform better on creative brainstorming afterwards. By letting your mind lie fallow for a bit, you allow the seeds of your next creative idea to take root. In my experience, some of my most creative and inspired thoughts have popped up when I was gazing out of a window or taking a quiet shower, moments when boredom unlocked a new insight. Boredom forces your brain off the hamster wheel of reactivity, giving you the space to imagine, daydream, and problem-solve in original ways. As counterintuitive as it sounds, the key to unlocking creativity may be not more stimulation, but less.</p>
<p>Silence gives you boredom. Boredom gives you the power to think, and not be reactive. Instead of immediately responding to every input, a bored and quiet mind can ponder, observe, and choose its actions more wisely. In a world of knee-jerk reactions and information overload, that ability to pause and think is indeed a superpower.</p>

<h2>Quieting the neurodivergent mind</h2>
<p>Embracing silence has been especially meaningful for me as someone who is neurodivergent. Conditions like ADHD often come with racing thoughts, sensory sensitivities, or an urge to seek stimulation. The idea of sitting still in silence initially felt impossible to me, even counterproductive. In fact, it's common for people with ADHD to feel uncomfortable in very quiet settings. The brain's dopamine levels are low, so it constantly seeks external stimuli to perk up. In a silent room with no input, an ADHD brain may actually go into overdrive, desperately looking for something to engage with. No wonder many of us feel uneasy with silence at first. Our brains don't know what to do with it.</p>
<p>But I also learned that there are different kinds of silence. It doesn't have to mean sitting cross-legged in absolute stillness if that doesn't work for you. The goal is really to quiet the mind and give yourself a mental pause, and there are many paths to that state. For some neurodivergent people, a form of moving meditation can be the gateway to inner silence. I discovered this when I stopped forcing myself to follow stereotypical meditation routines. As one ADHD coach described it, meditation does not mean you have to sit with legs crossed. Once she gave herself permission to open up to other possibilities for accessing her silence, she found ways to use movement and exercise to access the creativity and energy inside her. I relate to that. Sometimes I achieve a quiet mind on a long solo run, or even doing a repetitive task like folding laundry. My body is occupied, which satisfies that need for activity, and my mind is free to drift calmly. After such active quiet periods, I often feel the same mental clarity and refreshed focus as I do after sitting in actual silence.</p>
<p>It takes practice and discipline to get comfortable with silence, especially with an attention-challenged or anxious mind. Early on, a minute of quiet felt like an eternity and made me squirm. But like any skill, you start small and build up. I began with just a few minutes of sitting in a dim room each morning, eyes closed, letting whatever thoughts come and go. At first my thoughts were a chaotic jumble. I'd catch myself mentally replaying old memories or worrying about my day. But I kept bringing my focus back whenever I noticed I'd drifted. Day by day, that mental muscle strengthened. The chatter in my head started to settle. I learned that I could experience moments of inner silence, little islands of peace in my busy brain. Over time those islands grew larger. Now, whether through formal meditation or simply a quiet cup of tea before others wake up, I crave those silent moments. The very thing that once felt strange and uncomfortable has become a cherished friend.</p>
${figure("/assets/avenzor/images/quiet-moment-window.webp", "A quiet window seat with a book, a cup and morning light")}

<h2>Finding calm in a noisy environment</h2>
<p>One important lesson I learned is that silence isn't just about the external environment. It's also an internal state. We won't always find ourselves in a tranquil forest or a soundproof room. Life is often noisy, especially for those of us in cities or busy households. Yet it's possible to cultivate a sense of quietude even amidst noise. Inner silence means a mind that isn't incessantly reacting to every sound and stimulus. For example, I've practised tuning into a single focus, like my breathing, in the middle of a crowded, loud café, effectively creating a bubble of calm around me. Similarly, some neurodivergent people actually use controlled ambient noise, like quiet music or white noise, to help tune out disruptive sounds and centre their mind. Whether it's through noise-cancelling headphones or simply developing concentration, you can learn to carry silence within you as a mental habit.</p>
<p>In many spiritual traditions, people have long used techniques to find inner quiet: monks chanting or praying internally even as the world around them bustles. Across cultures, periods of silence, through meditation, prayer, or retreat, have been valued as paths to self-knowledge and peace for millennia. That timeless wisdom is accessible to anyone, regardless of belief. By embracing moments of quiet, we give ourselves permission to just be. Even in a noisy setting, you can close your eyes for a minute, take a slow breath, and briefly retreat into an inner sanctuary of silence. It's like hitting a reset button for your overstimulated mind.</p>

<h2>Embracing silence in daily life</h2>
<p>Bringing more silence and stillness into your life doesn't require dramatic changes. You can start with small pockets of quiet and simple habits that create space for your mind. Here are a few ways to begin embracing the power of silence:</p>
<ul>
<li><strong>Morning quiet time.</strong> Begin the day with a few minutes of silence. Sit with your coffee or tea and resist the urge to check your phone. Let your mind wake up slowly. Even five minutes of quiet reflection in the morning can set a calm tone for the day.</li>
<li><strong>Mindful pauses.</strong> Insert mini-pauses between your daily activities. When you finish a task or during a break, take sixty seconds to just breathe and do nothing. These micro-moments of silence help break the cycle of constant hurry and reactivity.</li>
<li><strong>Device-free moments.</strong> Identify certain times to unplug from electronics: during meals, on an evening walk, or the last half-hour before bed. Removing constant media noise allows your brain to wind down and listen to its own thoughts.</li>
<li><strong>Monotasking.</strong> Instead of multitasking with music or TV always in the background, try doing one thing at a time in quiet. Wash dishes without any audio on, or drive in silence. These everyday tasks become almost meditative and let your mind wander creatively.</li>
<li><strong>Nature and solitude.</strong> If possible, spend time in nature or a quiet park, alone. Take a slow walk and pay attention to the natural sounds, or the silence. Nature's relative quiet can be profoundly restorative and reminds us how to be present.</li>
<li><strong>Journaling or daydreaming.</strong> Embrace a bit of boredom by sitting with a blank page or staring out of the window. If your mind is racing, you can journal to let out thoughts, or simply let yourself daydream. This idle time often leads to new ideas or insights once the initial restlessness passes.</li>
</ul>
<p>Everyone's path to quiet will look different. The key is giving yourself permission to pause. Rather than viewing silence as wasted time, remind yourself that it's productive in its own way: brain-soothing, insight-producing, and stress-relieving. You're allowed to unplug and do nothing for a while.</p>

<h2>The reward beyond the struggle</h2>
<p>My journey with silence has taught me that the initial discomfort is well worth pushing through. The first few times you try to sit in silence, your mind might rebel. You might feel fidgety, anxious, or even bored out of your skull. That's normal. We're so used to constant input that the absence of it feels jarring at first. Stick with it. If you can endure that awkward beginning, you'll break through to a place where silence becomes not a void to fear, but a sanctuary to seek.</p>
<p>I used to be in such a hurry that I never gave myself a moment's peace. Now I actively look forward to my quiet moments of the day. I have learned to think before I act, to respond rather than react, and to simply sit with myself. In the stillness, I've found a deeper connection to my own thoughts and feelings. It's almost as if I had never truly met my own mind before, the way one meets a friend in calm conversation.</p>
<p>These days, silence truly is my old friend. And like any good friend, it has a lot to say once you stop and listen. Embracing silence, even a little each day, can quietly transform how you move through the world. It has certainly done so for me. So go ahead: give yourself permission to do nothing. Let silence speak. You may be surprised at the power and peace that have been waiting for you in the quiet all along.</p>
`,
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
