module TestData exposing (..)

import Json.Encode as Enc
import Model.Post exposing (Post)
import Time


encodePost : Post -> String
encodePost post =
    let
        fields =
            [ ( "by", Enc.string post.by )
            , ( "id", Enc.int post.id )
            , ( "score", Enc.int post.score )
            , ( "time", Enc.int (Time.posixToMillis post.time // 1000) )
            , ( "title", Enc.string post.title )
            , ( "type", Enc.string post.type_ )
            ]
                ++ (post.url |> Maybe.map (\url -> [ ( "url", Enc.string url ) ]) |> Maybe.withDefault [])
    in
    fields
        |> Enc.object
        |> Enc.encode 2


posts : List Post
posts =
    List.take 20 allPosts


allPosts : List Post
allPosts =
    [ { by = "rahimnathwani"
      , id = 42039296
      , score = 78
      , time = Time.millisToPosix (1730704767 * 1000)
      , title = "Shaderblocks: Block-based image editing"
      , type_ = "story"
      , url = Just "https://thejenkinscomic.net/shaderblocks/"
      }
    , { by = "Terretta"
      , id = 42098236
      , score = 102
      , time = Time.millisToPosix (1731205592 * 1000)
      , title = "Physical Intelligence's first generalist policy AI can finally do your laundry"
      , type_ = "story"
      , url = Just "https://www.physicalintelligence.company/blog/pi0"
      }
    , { by = "kaathewise"
      , id = 42095292
      , score = 445
      , time = Time.millisToPosix (1731170179 * 1000)
      , title = "IronCalc – Open-Source Spreadsheet Engine"
      , type_ = "story"
      , url = Just "https://www.ironcalc.com/"
      }
    , { by = "pil0u"
      , id = 42095580
      , score = 453
      , time = Time.millisToPosix (1731173250 * 1000)
      , title = "OpenCoder: Open Cookbook for Top-Tier Code Large Language Models"
      , type_ = "story"
      , url = Just "https://opencoder-llm.github.io/"
      }
    , { by = "kengoa"
      , id = 42096837
      , score = 134
      , time = Time.millisToPosix (1731185651 * 1000)
      , title = "Show HN: Visprex – Open-source, in-browser data visualisation tool for CSV files"
      , type_ = "story"
      , url = Just "https://docs.visprex.com/"
      }
    , { by = "thunderbong"
      , id = 42098491
      , score = 39
      , time = Time.millisToPosix (1731211057 * 1000)
      , title = "Audio Decomposition – open-source seperation of music to constituent instruments"
      , type_ = "story"
      , url = Just "https://matthew-bird.com/blogs/Audio-Decomposition.html"
      }
    , { by = "drogus"
      , id = 42095879
      , score = 207
      , time = Time.millisToPosix (1731176070 * 1000)
      , title = "Show HN: Jaws – a JavaScript to WASM ahead-of-time compiler"
      , type_ = "story"
      , url = Just "https://github.com/drogus/jaws"
      }
    , { by = "gregsadetsky"
      , id = 42096717
      , score = 201
      , time = Time.millisToPosix (1731184504 * 1000)
      , title = "NYC Subway Station Layouts"
      , type_ = "story"
      , url = Just "http://www.projectsubwaynyc.com/gallery"
      }
    , { by = "todsacerdoti"
      , id = 42050954
      , score = 188
      , time = Time.millisToPosix (1730809388 * 1000)
      , title = "Zig's (.{}){} Syntax"
      , type_ = "story"
      , url = Just "https://www.openmymind.net/Zigs-weird-syntax/"
      }
    , { by = "sshroot"
      , id = 42094546
      , score = 117
      , time = Time.millisToPosix (1731161904 * 1000)
      , title = "FrontierMath: A benchmark for evaluating advanced mathematical reasoning in AI"
      , type_ = "story"
      , url = Just "https://epochai.org/frontiermath/the-benchmark"
      }
    , { by = "mhb"
      , id = 42097856
      , score = 65
      , time = Time.millisToPosix (1731199914 * 1000)
      , title = "A skeleton made from the bones of at least eight people thousands of years apart"
      , type_ = "story"
      , url = Just "https://www.smithsonianmag.com/smart-news/archaeologists-are-bewildered-by-a-skeleton-made-from-the-bones-of-at-least-eight-people-who-died-thousands-of-years-apart-180985419/"
      }
    , { by = "p4bl0"
      , id = 42093756
      , score = 361
      , time = Time.millisToPosix (1731150370 * 1000)
      , title = "Mergiraf: a syntax-aware merge driver for Git"
      , type_ = "story"
      , url = Just "https://mergiraf.org/"
      }
    , { by = "ossusermivami"
      , id = 42044426
      , score = 17
      , time = Time.millisToPosix (1730744179 * 1000)
      , title = "Measuring keyboard-to-photon latency with a light sensor (2023)"
      , type_ = "story"
      , url = Just "https://thume.ca/2020/05/20/making-a-latency-tester/"
      }
    , { by = "tndata"
      , id = 42057964
      , score = 13
      , time = Time.millisToPosix (1730879941 * 1000)
      , title = "Pushed Authorization Requests (Par) in Asp.net Core 9"
      , type_ = "story"
      , url = Just "https://nestenius.se/net/pushed-authorization-requests-par-in-asp-net-core-9/"
      }
    , { by = "rramadass"
      , id = 42060750
      , score = 10
      , time = Time.millisToPosix (1730894379 * 1000)
      , title = "Mind-Bending Soviet Era Oil Rig City on the Caspian Sea"
      , type_ = "story"
      , url = Just "https://www.cnn.com/2024/11/06/climate/oil-rocks-neft-daslari-caspian-sea-city/index.html"
      }
    , { by = "todsacerdoti"
      , id = 42098466
      , score = 18
      , time = Time.millisToPosix (1731210352 * 1000)
      , title = "GenMC: Model checking for concurrent C programs"
      , type_ = "story"
      , url = Just "https://plv.mpi-sws.org/genmc/"
      }
    , { by = "JohannesKauf"
      , id = 42093511
      , score = 294
      , time = Time.millisToPosix (1731145688 * 1000)
      , title = "Show HN: HTML-to-Markdown – convert entire websites to Markdown with Golang/CLI"
      , type_ = "story"
      , url = Just "https://github.com/JohannesKaufmann/html-to-markdown"
      }
    , { by = "cybersoyuz"
      , id = 42097261
      , score = 221
      , time = Time.millisToPosix (1731190643 * 1000)
      , title = "Grim Fandango"
      , type_ = "story"
      , url = Just "https://www.filfre.net/2024/11/grim-fandango/"
      }
    , { by = "wsintra2022"
      , id = 42095752
      , score = 103
      , time = Time.millisToPosix (1731174929 * 1000)
      , title = "Early Cascade Injection: From Windows process creation to stealthy injection"
      , type_ = "story"
      , url = Just "https://www.outflank.nl/blog/2024/10/15/introducing-early-cascade-injection-from-windows-process-creation-to-stealthy-injection/"
      }
    , { by = "jackcook"
      , id = 42095302
      , score = 147
      , time = Time.millisToPosix (1731170288 * 1000)
      , title = "When machine learning tells the wrong story"
      , type_ = "story"
      , url = Just "https://jackcook.com/2024/11/09/bigger-fish.html"
      }
    , { by = "Hooke"
      , id = 42070630
      , score = 20
      , time = Time.millisToPosix (1730932654 * 1000)
      , title = "Hard Cases for a Handle Theory"
      , type_ = "story"
      , url = Just "https://www.cabinetmagazine.org/issues/68/dolven.php"
      }
    , { by = "PaulHoule"
      , id = 42093037
      , score = 192
      , time = Time.millisToPosix (1731137276 * 1000)
      , title = "Texture-Less Text Rendering"
      , type_ = "story"
      , url = Just "https://poniesandlight.co.uk/reflect/debug_print_text/"
      }
    , { by = "azhenley"
      , id = 42096915
      , score = 143
      , time = Time.millisToPosix (1731186641 * 1000)
      , title = "You too can write a book"
      , type_ = "story"
      , url = Just "https://parentheticallyspeaking.org/articles/write-a-book/"
      }
    , { by = "janandonly"
      , id = 42026251
      , score = 197
      , time = Time.millisToPosix (1730553845 * 1000)
      , title = "Obtainium: Get Android App Updates Directly from the Source"
      , type_ = "story"
      , url = Just "https://obtainium.imranr.dev/"
      }
    , { by = "walterbell"
      , id = 42078469
      , score = 173
      , time = Time.millisToPosix (1730998838 * 1000)
      , title = "Since the '60s, Ford has stored cars underground in a Kansas City cave"
      , type_ = "story"
      , url = Just "https://www.hagerty.com/media/automotive-history/since-the-60s-ford-has-stored-cars-underground-in-a-kansas-city-cave/"
      }
    , { by = "mindracer"
      , id = 42093851
      , score = 129
      , time = Time.millisToPosix (1731152008 * 1000)
      , title = "Somebody moved the UK's oldest satellite in the mid 1970s, but no one knows who"
      , type_ = "story"
      , url = Just "https://www.bbc.co.uk/news/articles/cpwrr58801yo"
      }
    , { by = "dataminer"
      , id = 42094573
      , score = 520
      , time = Time.millisToPosix (1731162210 * 1000)
      , title = "Scientist treated her own cancer with viruses she grew in the lab"
      , type_ = "story"
      , url = Just "https://www.nature.com/articles/d41586-024-03647-0"
      }
    , { by = "k4k4"
      , id = 42097735
      , score = 13
      , time = Time.millisToPosix (1731197711 * 1000)
      , title = "Show HN: Dracan – Open-source, 1:1 proxy with simple filtering/validation config"
      , type_ = "story"
      , url = Just "https://github.com/Veinar/dracan"
      }
    , { by = "impish9208"
      , id = 42090704
      , score = 140
      , time = Time.millisToPosix (1731102260 * 1000)
      , title = "Notes on Guyana"
      , type_ = "story"
      , url = Just "https://mattlakeman.org/2024/11/08/notes-on-guyana/"
      }
    , { by = "robinhouston"
      , id = 42031642
      , score = 299
      , time = Time.millisToPosix (1730618880 * 1000)
      , title = "Can humans say the largest prime number before we find the next one?"
      , type_ = "story"
      , url = Just "https://saytheprime.com/"
      }
    , { by = "whereistimbo"
      , id = 42097160
      , score = 16
      , time = Time.millisToPosix (1731189514 * 1000)
      , title = "UnifiedPush: A decentralized, open-source push notification protocol"
      , type_ = "story"
      , url = Just "https://f-droid.org/2022/12/18/unifiedpush.html"
      }
    , { by = "lmxyy"
      , id = 42093112
      , score = 164
      , time = Time.millisToPosix (1731138382 * 1000)
      , title = "SVDQuant: 4-Bit Quantization Powers 12B Flux on a 16GB 4090 GPU with 3x Speedup"
      , type_ = "story"
      , url = Just "https://hanlab.mit.edu/blog/svdquant"
      }
    , { by = "nateb2022"
      , id = 42091365
      , score = 586
      , time = Time.millisToPosix (1731109606 * 1000)
      , title = "Delta: A syntax-highlighting pager for Git, diff, grep, and blame output"
      , type_ = "story"
      , url = Just "https://github.com/dandavison/delta"
      }
    , { by = "zdw"
      , id = 42035990
      , score = 80
      , time = Time.millisToPosix (1730666876 * 1000)
      , title = "A Brief History of Cyrix"
      , type_ = "story"
      , url = Just "https://www.abortretry.fail/p/a-brief-history-of-cyrix"
      }
    , { by = "NaOH"
      , id = 42045830
      , score = 44
      , time = Time.millisToPosix (1730753259 * 1000)
      , title = "The Saturn V FUELDRAULIC Gimbal System (1963)"
      , type_ = "story"
      , url = Just "https://www.powermotiontech.com/hydraulics/hydraulic-fluids/article/21887406/the-saturn-v-fueldraulic-gimbal-system"
      }
    , { by = "amrrs"
      , id = 42043967
      , score = 121
      , time = Time.millisToPosix (1730741777 * 1000)
      , title = "A CC-By Open-Source TTS Model with Voice Cloning"
      , type_ = "story"
      , url = Just "https://huggingface.co/OuteAI/OuteTTS-0.1-350M"
      }
    , { by = "Liriel"
      , id = 42098982
      , score = 7
      , time = Time.millisToPosix (1731224791 * 1000)
      , title = "Judge tosses publishers' copyright suit against OpenAI"
      , type_ = "story"
      , url = Just "https://www.theregister.com/2024/11/08/openai_copyright_suit_dismissed/"
      }
    , { by = "surprisetalk"
      , id = 42087560
      , score = 173
      , time = Time.millisToPosix (1731079767 * 1000)
      , title = "Making Electronic Calipers"
      , type_ = "story"
      , url = Just "https://kevinlynagh.com/calipertron/"
      }
    , { by = "benchmarkist"
      , id = 42098880
      , score = 12
      , time = Time.millisToPosix (1731222155 * 1000)
      , title = "Earth Could Be Alien to Humans by 2500 (2021)"
      , type_ = "story"
      , url = Just "https://www.scientificamerican.com/article/earth-could-be-alien-to-humans-by-2500/"
      }
    , { by = "che_shr_cat"
      , id = 42097418
      , score = 6
      , time = Time.millisToPosix (1731192687 * 1000)
      , title = "Diffusion Models Are Evolutionary Algorithms"
      , type_ = "story"
      , url = Just "https://gonzoml.substack.com/p/diffusion-models-are-evolutionary"
      }
    , { by = "ZeroGravitas"
      , id = 42045373
      , score = 362
      , time = Time.millisToPosix (1730749756 * 1000)
      , title = "HPV vaccination: How the world can eliminate cervical cancer"
      , type_ = "story"
      , url = Just "https://ourworldindata.org/hpv-vaccination-world-can-eliminate-cervical-cancer"
      }
    , { by = "Bostonian"
      , id = 42089740
      , score = 71
      , time = Time.millisToPosix (1731094103 * 1000)
      , title = "Algol-68 seemed like a good idea"
      , type_ = "story"
      , url = Just "https://craftofcoding.wordpress.com/2024/10/21/algol-68-seemed-like-a-good-idea-until-it-wasnt/"
      }
    , { by = "hn_acker"
      , id = 42047027
      , score = 278
      , time = Time.millisToPosix (1730761948 * 1000)
      , title = "Ticketmaster’s attempt to game arbitration services fails"
      , type_ = "story"
      , url = Just "https://blog.ericgoldman.org/archives/2024/10/ticketmasters-gaming-of-arbitration-services-fails-heckman-v-live-nation.htm"
      }
    , { by = "vivekd"
      , id = 42094427
      , score = 222
      , time = Time.millisToPosix (1731160413 * 1000)
      , title = "Memories are not only in the brain, human cell study finds"
      , type_ = "story"
      , url = Just "https://medicalxpress.com/news/2024-11-memories-brain-human-cell.html"
      }
    , { by = "Qision"
      , id = 42075467
      , score = 55
      , time = Time.millisToPosix (1730975945 * 1000)
      , title = "Lynis – Security auditing and hardening tool, for Unix-based systems"
      , type_ = "story"
      , url = Just "https://github.com/CISOfy/lynis"
      }
    , { by = "transpute"
      , id = 42084588
      , score = 560
      , time = Time.millisToPosix (1731046214 * 1000)
      , title = "Multiple new macOS sandbox escape vulnerabilities"
      , type_ = "story"
      , url = Just "https://jhftss.github.io/A-New-Era-of-macOS-Sandbox-Escapes/"
      }
    , { by = "breezykermo"
      , id = 42056654
      , score = 110
      , time = Time.millisToPosix (1730856574 * 1000)
      , title = "Using Two ReMarkables"
      , type_ = "story"
      , url = Just "https://www.ohrg.org/using-two-remarkables"
      }
    , { by = "djoldman"
      , id = 42094240
      , score = 37
      , time = Time.millisToPosix (1731158106 * 1000)
      , title = "The Arsse – The clean and modern RSS server that doesn't give you any crap"
      , type_ = "story"
      , url = Just "https://thearsse.com/"
      }
    , { by = "biorach"
      , id = 42068510
      , score = 99
      , time = Time.millisToPosix (1730923589 * 1000)
      , title = "Funding restored for man-page maintenance"
      , type_ = "story"
      , url = Just "https://lwn.net/Articles/997193/"
      }
    , { by = "alexzeitler"
      , id = 42090430
      , score = 351
      , time = Time.millisToPosix (1731099587 * 1000)
      , title = "I quit Google to work for myself (2018)"
      , type_ = "story"
      , url = Just "https://mtlynch.io/why-i-quit-google/"
      }
    , { by = "xiande04"
      , id = 42034305
      , score = 171
      , time = Time.millisToPosix (1730653782 * 1000)
      , title = "Claude Shannon: Mathematician, engineer, genius and juggler (2017)"
      , type_ = "story"
      , url = Just "https://www.juggle.org/claude-shannon-mathematician-engineer-genius-juggler/"
      }
    , { by = "tosh"
      , id = 42081874
      , score = 208
      , time = Time.millisToPosix (1731018873 * 1000)
      , title = "Cops suspect iOS 18 iPhones are communicating to force reboots"
      , type_ = "story"
      , url = Just "https://www.macrumors.com/2024/11/07/ios-18-forcing-reboots-law-enforcement/"
      }
    , { by = "thunderbong"
      , id = 42039184
      , score = 452
      , time = Time.millisToPosix (1730703383 * 1000)
      , title = "In Memory of Stiver"
      , type_ = "story"
      , url = Just "https://blog.jetbrains.com/idea/2024/11/in-memory-of-stiver/"
      }
    , { by = "CharlesW"
      , id = 42084080
      , score = 506
      , time = Time.millisToPosix (1731039359 * 1000)
      , title = "Stabilizing the Obra Dinn 1-bit dithering process (2017)"
      , type_ = "story"
      , url = Just "https://forums.tigsource.com/index.php?topic=40832.msg1363742#msg1363742"
      }
    , { by = "XzetaU8"
      , id = 42087517
      , score = 38
      , time = Time.millisToPosix (1731079336 * 1000)
      , title = "Gravity's Eastern Voyage"
      , type_ = "story"
      , url = Just "https://royalsociety.org/blog/2024/09/gravitys-eastern-voyage/"
      }
    , { by = "lapnect"
      , id = 42058888
      , score = 23
      , time = Time.millisToPosix (1730886723 * 1000)
      , title = "Iterative α-(de)blending and Stochastic Interpolants"
      , type_ = "story"
      , url = Just "http://nicktasios.nl/posts/iterative-alpha-deblending/"
      }
    , { by = "mlajtos"
      , id = 42090633
      , score = 160
      , time = Time.millisToPosix (1731101503 * 1000)
      , title = "My Notes on Apple Math Notes"
      , type_ = "story"
      , url = Just "https://mlajtos.mu/posts/new-kind-of-paper-5"
      }
    , { by = "dcas"
      , id = 42097132
      , score = 10
      , time = Time.millisToPosix (1731189168 * 1000)
      , title = "How Shopify built the BFCM 2023 globe"
      , type_ = "story"
      , url = Just "https://shopify.engineering/how-we-built-shopifys-bfcm-2023-globe"
      }
    , { by = "mediisoccuspupa"
      , id = 42041355
      , score = 89
      , time = Time.millisToPosix (1730727057 * 1000)
      , title = "Python Logic Simulation Library"
      , type_ = "story"
      , url = Just "https://github.com/cjdrake/seqlogic"
      }
    , { by = "amalinovic"
      , id = 42059650
      , score = 82
      , time = Time.millisToPosix (1730889639 * 1000)
      , title = "Optimize Database Performance in Ruby on Rails and ActiveRecord"
      , type_ = "story"
      , url = Just "https://blog.appsignal.com/2024/10/30/optimize-database-performance-in-ruby-on-rails-and-activerecord.html"
      }
    , { by = "benbreen"
      , id = 42092700
      , score = 34
      , time = Time.millisToPosix (1731130096 * 1000)
      , title = "Reconstruction of Lomonosov's Discovery of Venus's Atmosphere (2012) [pdf]"
      , type_ = "story"
      , url = Just "https://lss.fnal.gov/archive/2012/pub/fermilab-pub-12-937-apc.pdf"
      }
    , { by = "_Microft"
      , id = 42097815
      , score = 24
      , time = Time.millisToPosix (1731199170 * 1000)
      , title = "Egypt is certified malaria-free by WHO"
      , type_ = "story"
      , url = Just "https://www.who.int/news/item/20-10-2024-egypt-is-certified-malaria-free-by-who"
      }
    , { by = "surprisetalk"
      , id = 42089196
      , score = 91
      , time = Time.millisToPosix (1731090180 * 1000)
      , title = "Why 4D geometry makes me sad [video]"
      , type_ = "story"
      , url = Just "https://www.youtube.com/watch?v=piJkuavhV50"
      }
    , { by = "networked"
      , id = 42093541
      , score = 19
      , time = Time.millisToPosix (1731146369 * 1000)
      , title = "Cache Directory Tagging Specification (2004)"
      , type_ = "story"
      , url = Just "https://bford.info/cachedir/"
      }
    , { by = "surprisetalk"
      , id = 42041129
      , score = 23
      , time = Time.millisToPosix (1730725247 * 1000)
      , title = "Automat: A tangible interface for virtual things"
      , type_ = "story"
      , url = Just "https://automat.org"
      }
    , { by = "okl"
      , id = 42091724
      , score = 56
      , time = Time.millisToPosix (1731113851 * 1000)
      , title = "A Random Walk Through Ada (2014)"
      , type_ = "story"
      , url = Just "http://cowlark.com/2014-04-27-ada/index.html"
      }
    , { by = "szkosma"
      , id = 42028697
      , score = 59
      , time = Time.millisToPosix (1730576356 * 1000)
      , title = "Nikolai Fyodorov wanted to resurrect the dead to live among the stars"
      , type_ = "story"
      , url = Just "https://lz.kubicki.org/a-letter-about-nikolai-fyodorov/"
      }
    , { by = "wglb"
      , id = 42055238
      , score = 8
      , time = Time.millisToPosix (1730841346 * 1000)
      , title = "ML analysis tracks the evolution of 16th-century European astronomical thought"
      , type_ = "story"
      , url = Just "https://phys.org/news/2024-10-machine-analysis-tracks-evolution-16th.html"
      }
    , { by = "impish9208"
      , id = 42082998
      , score = 286
      , time = Time.millisToPosix (1731027409 * 1000)
      , title = "FDA proposes ending use of oral phenylephrine as OTC nasal decongestant"
      , type_ = "story"
      , url = Just "https://www.fda.gov/news-events/press-announcements/fda-proposes-ending-use-oral-phenylephrine-otc-monograph-nasal-decongestant-active-ingredient-after"
      }
    , { by = "fanf2"
      , id = 42050573
      , score = 16
      , time = Time.millisToPosix (1730805295 * 1000)
      , title = "HashML-DSA Considered Harmful"
      , type_ = "story"
      , url = Just "https://keymaterial.net/2024/11/05/hashml-dsa-considered-harmful/"
      }
    , { by = "icy"
      , id = 42086596
      , score = 133
      , time = Time.millisToPosix (1731071615 * 1000)
      , title = "How to self-host all of Bluesky except the AppView (for now)"
      , type_ = "story"
      , url = Just "https://alice.bsky.sh/post/3laega7icmi2q"
      }
    , { by = "asiffer"
      , id = 42094893
      , score = 6
      , time = Time.millisToPosix (1731165846 * 1000)
      , title = "Show HN: Svgg – Turn raw SVG into image link"
      , type_ = "story"
      , url = Just "https://svgg.link"
      }
    , { by = "mitchbob"
      , id = 42081309
      , score = 43
      , time = Time.millisToPosix (1731015222 * 1000)
      , title = "The Charms of Catastrophe (1978)"
      , type_ = "story"
      , url = Just "https://www.nybooks.com/articles/1978/06/15/the-charms-of-catastrophe/"
      }
    , { by = "mailyk"
      , id = 42088758
      , score = 611
      , time = Time.millisToPosix (1731087583 * 1000)
      , title = "Mitochondria Are Alive"
      , type_ = "story"
      , url = Just "https://www.asimov.press/p/mitochondria"
      }
    , { by = "dargscisyhp"
      , id = 42098921
      , score = 14
      , time = Time.millisToPosix (1731223327 * 1000)
      , title = "Brewington Hardaway Becomes First U.S. Born Black Grandmaster"
      , type_ = "story"
      , url = Just "https://www.chess.com/news/view/brewington-hardaway-earns-gm-title"
      }
    , { by = "JNRowe"
      , id = 42076200
      , score = 201
      , time = Time.millisToPosix (1730983829 * 1000)
      , title = "Excerpts from a conversation about personal information management"
      , type_ = "story"
      , url = Just "https://sachachua.com/blog/2024/11/excerpts-from-a-conversation-with-john-wiegley-johnw-and-adam-porter-alphapapa-about-personal-information-management/"
      }
    , { by = "threeme3"
      , id = 42085273
      , score = 236
      , time = Time.millisToPosix (1731054654 * 1000)
      , title = "Λ-2D: An Exploration of Drawing as Programming Language"
      , type_ = "story"
      , url = Just "https://www.media.mit.edu/projects/2d-an-exploration-of-drawing-as-programming-language-featuring-ideas-from-lambda-calculus/overview/"
      }
    , { by = "lapnect"
      , id = 42084779
      , score = 73
      , time = Time.millisToPosix (1731048862 * 1000)
      , title = "The 'Invisibility Cloak' – Slash-Proc Magic"
      , type_ = "story"
      , url = Just "https://dfir.ch/posts/slash-proc/"
      }
    , { by = "abe94"
      , id = 42088250
      , score = 85
      , time = Time.millisToPosix (1731084339 * 1000)
      , title = "Colors of the Court – NBA Uniforms"
      , type_ = "story"
      , url = Just "https://pudding.cool/2024/10/nba-uniforms/"
      }
    , { by = "chr15m"
      , id = 42085036
      , score = 319
      , time = Time.millisToPosix (1731051782 * 1000)
      , title = "Show HN: Asterogue, my sci-fi roguelike, is now playable on the web"
      , type_ = "story"
      , url = Just "https://asterogue.com"
      }
    , { by = "skandium"
      , id = 42084977
      , score = 219
      , time = Time.millisToPosix (1731051031 * 1000)
      , title = "Perceptually lossless (talking head) video compression at 22kbit/s"
      , type_ = "story"
      , url = Just "https://mlumiste.com/technical/liveportrait-compression/"
      }
    , { by = "galapago"
      , id = 42095005
      , score = 9
      , time = Time.millisToPosix (1731167200 * 1000)
      , title = "ScummVM adds support for Castle Master (1990)"
      , type_ = "story"
      , url = Just "https://www.scummvm.org/news/20241109/"
      }
    , { by = "pwim"
      , id = 42072647
      , score = 195
      , time = Time.millisToPosix (1730946278 * 1000)
      , title = "The English Paradox: Four decades of life and language in Japan"
      , type_ = "story"
      , url = Just "https://www.tokyodev.com/articles/the-english-paradox-four-decades-of-life-and-language-in-japan"
      }
    , { by = "mentalgear"
      , id = 42074348
      , score = 125
      , time = Time.millisToPosix (1730964032 * 1000)
      , title = "URAvatar: Universal Relightable Gaussian Codec Avatars"
      , type_ = "story"
      , url = Just "https://junxuan-li.github.io/urgca-website/"
      }
    , { by = "yoshuaw"
      , id = 42078476
      , score = 165
      , time = Time.millisToPosix (1730998891 * 1000)
      , title = "Hyperlight: Virtual machine-based security for functions at scale"
      , type_ = "story"
      , url = Just "https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/"
      }
    , { by = "tessierashpool9"
      , id = 42086987
      , score = 43
      , time = Time.millisToPosix (1731075197 * 1000)
      , title = "Toy Models of Superposition (2022)"
      , type_ = "story"
      , url = Just "https://transformer-circuits.pub/2022/toy_model/index.html#motivation"
      }
    , { by = "timbilt"
      , id = 42085665
      , score = 227
      , time = Time.millisToPosix (1731059904 * 1000)
      , title = "LoRA vs. Full Fine-Tuning: An Illusion of Equivalence"
      , type_ = "story"
      , url = Just "https://arxiv.org/abs/2410.21228"
      }
    , { by = "lightlyused"
      , id = 42097961
      , score = 51
      , time = Time.millisToPosix (1731201517 * 1000)
      , title = "Stargate built 15 years ago in Ohio 50k pounds concrete family time"
      , type_ = "story"
      , url = Just "https://www.usatoday.com/story/news/nation/2024/11/08/stargate-built-by-family-in-ohio/76133926007/"
      }
    , { by = "todsacerdoti"
      , id = 42094562
      , score = 7
      , time = Time.millisToPosix (1731162103 * 1000)
      , title = "Mergiraf: A syntax-aware merge driver for Git"
      , type_ = "story"
      , url = Just "https://antonin.delpeuch.eu/posts/mergiraf-a-syntax-aware-merge-driver-for-git/"
      }
    , { by = "lawls"
      , id = 42091043
      , score = 230
      , time = Time.millisToPosix (1731105740 * 1000)
      , title = "Claude AI to process secret government data through new Palantir deal"
      , type_ = "story"
      , url = Just "https://arstechnica.com/ai/2024/11/safe-ai-champ-anthropic-teams-up-with-defense-giant-palantir-in-new-deal/"
      }
    , { by = "bbayles"
      , id = 42076884
      , score = 448
      , time = Time.millisToPosix (1730989530 * 1000)
      , title = "Using Ghidra and Python to reverse engineer Ecco the Dolphin"
      , type_ = "story"
      , url = Just "https://32bits.substack.com/p/under-the-microscope-ecco-the-dolphin"
      }
    , { by = "CarefreeCrayon"
      , id = 42090771
      , score = 143
      , time = Time.millisToPosix (1731102940 * 1000)
      , title = "What Is a Staff Engineer?"
      , type_ = "story"
      , url = Just "https://nishtahir.com/what-is-a-staff-engineer/"
      }
    , { by = "MrBuddyCasino"
      , id = 42084344
      , score = 79
      , time = Time.millisToPosix (1731042565 * 1000)
      , title = "Intentrace: Strace for Everyone"
      , type_ = "story"
      , url = Just "https://github.com/sectordistrict/intentrace"
      }
    , { by = "benbreen"
      , id = 42074124
      , score = 74
      , time = Time.millisToPosix (1730961997 * 1000)
      , title = "The Brothers Grimm: A Biography"
      , type_ = "story"
      , url = Just "https://theamericanscholar.org/masters-of-horror-and-magic/"
      }
    , { by = "tysone"
      , id = 42087087
      , score = 163
      , time = Time.millisToPosix (1731076149 * 1000)
      , title = "Elwood Edwards, voice of AOL's 'you've got mail' alert, has died"
      , type_ = "story"
      , url = Just "https://www.nytimes.com/2024/11/07/technology/elwood-edwards-aol-dead.html"
      }
    , { by = "kristianp"
      , id = 42082841
      , score = 13
      , time = Time.millisToPosix (1731026310 * 1000)
      , title = "Converting ASCII strings to lower case at crazy speeds with AVX-512"
      , type_ = "story"
      , url = Just "https://lemire.me/blog/2024/08/03/converting-ascii-strings-to-lower-case-at-crazy-speeds-with-avx-512/"
      }
    , { by = "gaws"
      , id = 42078581
      , score = 333
      , time = Time.millisToPosix (1730999559 * 1000)
      , title = "Mushroom Color Atlas"
      , type_ = "story"
      , url = Just "https://www.mushroomcoloratlas.com/"
      }
    , { by = "Soumame"
      , id = 42072709
      , score = 125
      , time = Time.millisToPosix (1730946764 * 1000)
      , title = "Show HN: TutoriaLLM – AI Integrated programming tutorials"
      , type_ = "story"
      , url = Just "https://github.com/TutoriaLLM/TutoriaLLM"
      }
    , { by = "sschueller"
      , id = 42075365
      , score = 49
      , time = Time.millisToPosix (1730974812 * 1000)
      , title = "A mod that turns TI-84 calculators into GPT-based cheating device"
      , type_ = "story"
      , url = Just "https://github.com/chromalock/TI-32"
      }
    , { by = "bookofjoe"
      , id = 42078826
      , score = 58
      , time = Time.millisToPosix (1731000685 * 1000)
      , title = "Imaging shapes of atomic nuclei in high-energy nuclear collisions"
      , type_ = "story"
      , url = Just "https://www.nature.com/articles/s41586-024-08097-2"
      }
    ]


textPosts : List Post
textPosts =
    [ { by = "mtgr18977"
      , id = 42097996
      , score = 25
      , time = Time.millisToPosix (1731202239 * 1000)
      , title = "Verbalize – text editor with writing assistance for Brazilian Portuguese"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "jahooma"
      , id = 42078536
      , score = 278
      , time = Time.millisToPosix (1730999188 * 1000)
      , title = "Launch HN: Codebuff (YC F24) – CLI tool that writes code for you"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "maxmaio"
      , id = 42066500
      , score = 116
      , time = Time.millisToPosix (1730916355 * 1000)
      , title = "Launch HN: Midship (YC S24) – Turn PDFs, docs, and images into usable data"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "giantg2"
      , id = 42091555
      , score = 50
      , time = Time.millisToPosix (1731111805 * 1000)
      , title = "Ask HN: Best Cyber Warfare Books?"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "rupi"
      , id = 42093803
      , score = 61
      , time = Time.millisToPosix (1731151417 * 1000)
      , title = "Ask HN: What hacks/tips do you use to make AI work better for you?"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "kouru225"
      , id = 42093130
      , score = 6
      , time = Time.millisToPosix (1731138777 * 1000)
      , title = "Ask HN: Websites that actually test and review products for listicles"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "superconduct123"
      , id = 42079086
      , score = 77
      , time = Time.millisToPosix (1731002289 * 1000)
      , title = "Ask HN: Why did consumer 3D printing take so long to be invented?"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "gooob"
      , id = 42030832
      , score = 251
      , time = Time.millisToPosix (1730601591 * 1000)
      , title = "Ask HN: What would you preserve if the internet were to go down tomorrow?"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "systemkwiat"
      , id = 42079768
      , score = 265
      , time = Time.millisToPosix (1731006374 * 1000)
      , title = "Ask HN: Life-changing purchases since 2020? (Under $100 and under $1000)"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "thunderstruck"
      , id = 42076003
      , score = 54
      , time = Time.millisToPosix (1730982107 * 1000)
      , title = "Ask HN: How would you launch a privacy-first, Instagram-like social network?"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "dannyphantom"
      , id = 42079896
      , score = 14
      , time = Time.millisToPosix (1731007150 * 1000)
      , title = "Ask HN: What bookmarklets do you use?"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "DogRunner"
      , id = 42080637
      , score = 10
      , time = Time.millisToPosix (1731011610 * 1000)
      , title = "Corporate IT: What do you use to manage Linux laptops for your employees?"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "laksmanv"
      , id = 42095073
      , score = 14
      , time = Time.millisToPosix (1731167837 * 1000)
      , title = "Ask HN: What is your one-person-SaaS project?"
      , type_ = "story"
      , url = Nothing
      }
    , { by = "mustime"
      , id = 42084907
      , score = 5
      , time = Time.millisToPosix (1731050247 * 1000)
      , title = "Transform Your Productivity with Deep Work Zone"
      , type_ = "story"
      , url = Nothing
      }
    ]


jobPosts : List Post
jobPosts =
    [ { by = "macklinkachorn"
      , id = 42095453
      , score = 1
      , time = Time.millisToPosix (1731171672 * 1000)
      , title = "Trellis (YC W24) is hiring eng to turn documents into database"
      , type_ = "job"
      , url = Just "https://www.ycombinator.com/companies/trellis/jobs/1ypWafM-founding-engineer-full-time-backend-ml-infra"
      }
    ]
