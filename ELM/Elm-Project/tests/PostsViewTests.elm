module PostsViewTests exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Html exposing (select)
import Html.Attributes
import Model exposing (Msg(..))
import Model.Post exposing (Post)
import Model.PostsConfig as Config
import Test exposing (..)
import Test.Html.Event as Evt
import Test.Html.Query as Q
import Test.Html.Selector as S
import TestData as Data
import Time exposing (Month(..))
import Util.Time exposing (Date(..))
import View.Posts as Posts


currentTime : Time.Posix
currentTime =
    Data.posts
        |> List.map (\post -> Time.posixToMillis post.time)
        |> List.maximum
        |> Maybe.map (\t -> t + 7 * 24 * 60 * 60 * 1000)
        |> Maybe.withDefault 0
        |> Time.millisToPosix


selectShowJobPostsCheckbox : S.Selector
selectShowJobPostsCheckbox =
    S.all [ S.tag "input", S.attribute (Html.Attributes.type_ "checkbox"), S.id "checkbox-show-job-posts" ]


selectElementContainingShowJobPostsCheckbox : List S.Selector
selectElementContainingShowJobPostsCheckbox =
    [ S.containing [ selectShowJobPostsCheckbox ]
    , S.containing [ S.text "Show", S.text "job" ]
    ]


selectShowTextPostsCheckbox : S.Selector
selectShowTextPostsCheckbox =
    S.all [ S.tag "input", S.attribute (Html.Attributes.type_ "checkbox"), S.id "checkbox-show-text-only-posts" ]


selectElementContainingShowTextPostsCheckbox : List S.Selector
selectElementContainingShowTextPostsCheckbox =
    [ S.containing [ selectShowTextPostsCheckbox ]
    , S.containing [ S.text "Show", S.text "text" ]
    ]


type PostsConfigInput
    = ShowJobPostsCheckbox Bool
    | ShowTextOnlyPostsCheckbox Bool
    | PostsToShowSelect Int
    | SortBySelect Config.SortBy


triggerConfigChangedEvent : PostsConfigInput -> Result String Config.Change
triggerConfigChangedEvent ty =
    let
        ( selector, event ) =
            case ty of
                ShowJobPostsCheckbox value ->
                    ( [ S.tag "input", S.attribute (Html.Attributes.type_ "checkbox"), S.id "checkbox-show-job-posts" ], Evt.check value )

                ShowTextOnlyPostsCheckbox value ->
                    ( [ S.tag "input", S.attribute (Html.Attributes.type_ "checkbox"), S.id "checkbox-show-text-only-posts" ], Evt.check value )

                PostsToShowSelect value ->
                    ( [ S.tag "select", S.id "select-posts-per-page" ], Evt.input (String.fromInt value) )

                SortBySelect value ->
                    ( [ S.tag "select", S.id "select-sort-by" ], Evt.input (Config.sortToString value) )
    in
    Posts.postsConfigView Config.defaultConfig
        |> Q.fromHtml
        |> Q.find selector
        |> Evt.simulate event
        |> Evt.toResult
        |> Result.andThen
            (\evt ->
                case evt of
                    Model.ConfigChanged change ->
                        Ok change

                    _ ->
                        Err "Other message"
            )


suite : Test
suite =
    describe "module View.Posts"
        [ describe "\"Show job posts\" checkbox"
            [ test "postsConfigView has a checkbox for \"Show job posts\"" <|
                \_ ->
                    Posts.postsConfigView Config.defaultConfig
                        |> Q.fromHtml
                        |> Q.findAll
                            selectElementContainingShowJobPostsCheckbox
                        |> Q.count (Expect.equal 1)
            ]
        , describe "\"Show text only posts\" checkbox"
            [ test "postsConfigView has a checkbox for \"Show text only posts\"" <|
                \_ ->
                    Posts.postsConfigView Config.defaultConfig
                        |> Q.fromHtml
                        |> Q.findAll
                            selectElementContainingShowTextPostsCheckbox
                        |> Q.count (Expect.equal 1)
            ]
        , describe "\"posts per page\" select"
            [ test "postsConfigView has a \"posts per page\" select input wiht 3 options" <|
                \_ ->
                    Posts.postsConfigView Config.defaultConfig
                        |> Q.fromHtml
                        |> Q.find
                            [ S.tag "select", S.id "select-posts-per-page" ]
                        |> Q.children [ S.tag "option" ]
                        |> Q.count (Expect.equal 3)
            , test "The options for \"posts per page\" select input are 10, 25, 50" <|
                \_ ->
                    Posts.postsConfigView Config.defaultConfig
                        |> Q.fromHtml
                        |> Q.find
                            [ S.tag "select", S.id "select-posts-per-page" ]
                        |> Q.children [ S.tag "option" ]
                        |> Expect.all
                            [ Q.index 0 >> Q.has [ S.text "10" ]
                            , Q.index 1 >> Q.has [ S.text "25" ]
                            , Q.index 2 >> Q.has [ S.text "50" ]
                            ]
            ]
        , describe "\"sort by\" select"
            [ test "postsConfigView has a \"sort by\" select input with 4 options" <|
                \_ ->
                    Posts.postsConfigView Config.defaultConfig
                        |> Q.fromHtml
                        |> Q.find
                            [ S.tag "select", S.id "select-sort-by" ]
                        |> Q.children [ S.tag "option" ]
                        |> Q.count (Expect.equal 4)
            , test "The options for \"sort by\" select input are Score, Title, Posted, None" <|
                \_ ->
                    Posts.postsConfigView Config.defaultConfig
                        |> Q.fromHtml
                        |> Q.find
                            [ S.tag "select", S.id "select-sort-by" ]
                        |> Expect.all
                            (Config.sortOptions
                                |> List.map Config.sortToString
                                |> List.map (\opt -> Q.has [ S.containing [ S.text opt ] ])
                            )
            ]
        , describe "postsConfigView update"
            [ test "The ConfigChange message is sent when the \"Show job posts\" checkbox is clicked" <|
                \_ ->
                    triggerConfigChangedEvent (ShowJobPostsCheckbox True)
                        |> Expect.ok
            , test "The ConfigChange message is sent when the \"Show text only posts\" checkbox is clicked" <|
                \_ ->
                    triggerConfigChangedEvent (ShowTextOnlyPostsCheckbox True)
                        |> Expect.ok
            , test "The ConfigChange message is sent when the \"Posts to show\" select is changed" <|
                \_ ->
                    triggerConfigChangedEvent (PostsToShowSelect 50)
                        |> Expect.ok
            , test "The ConfigChange message is sent when the \"Sort by\" select is changed" <|
                \_ ->
                    triggerConfigChangedEvent (SortBySelect Config.Title)
                        |> Expect.ok
            ]
        , describe "postTable" <|
            [ test "View contains a table element" <|
                \_ ->
                    Posts.postTable Config.defaultConfig currentTime Data.posts
                        |> Q.fromHtml
                        |> Q.has [ S.tag "table" ]
            , test "The table has 5 columns" <|
                \_ ->
                    Posts.postTable Config.defaultConfig currentTime Data.posts
                        |> Q.fromHtml
                        |> Q.findAll [ S.tag "tr" ]
                        |> Q.first
                        |> Q.children [ S.tag "th" ]
                        |> Q.count (Expect.equal 5)
            ]
        , describe "first row"
            [ test "The first row of the table contains the field names" <|
                \_ ->
                    Posts.postTable Config.defaultConfig currentTime Data.posts
                        |> Q.fromHtml
                        |> Q.findAll [ S.tag "tr" ]
                        |> Q.first
                        |> Q.has
                            ([ "Score", "Title", "Type", "Posted", "Link" ]
                                |> List.map (\name -> S.containing [ S.tag "th", S.text name ])
                            )
            ]
        , describe "field tags"
            ([ "score", "title", "type", "time", "url" ]
                |> List.map ((++) "post-")
                |> List.map
                    (\field ->
                        test ("Each body row contains a cell with class " ++ field) <|
                            \_ ->
                                Posts.postTable Config.defaultConfig currentTime Data.posts
                                    |> Q.fromHtml
                                    |> Q.findAll [ S.tag "tr", S.containing [ S.tag "td" ] ]
                                    |> Expect.all
                                        [ Q.each (Q.has [ S.tag "td", S.class field ])
                                        , Q.count (Expect.atLeast 1)
                                        ]
                    )
            )
        , describe "field values"
            [ test "the number of rows is equal to the number of elements in the list" <|
                \_ ->
                    Posts.postTable Config.defaultConfig currentTime Data.posts
                        |> Q.fromHtml
                        |> Q.findAll [ S.tag "tr", S.containing [ S.tag "td" ] ]
                        |> Q.count (Expect.equal (Data.posts |> Config.filterPosts Config.defaultConfig |> List.length))
            , test "each row contains all fields" <|
                \_ ->
                    let
                        filteredPosts =
                            Data.posts |> Config.filterPosts Config.defaultConfig

                        rowContainsFields : Post -> Q.Single msg -> Expect.Expectation
                        rowContainsFields post row =
                            Expect.all
                                [ Q.has [ S.text post.title ]
                                , Q.has [ S.text (String.fromInt post.score) ]
                                , Q.has [ S.text post.type_ ]
                                , Q.has [ S.text (Util.Time.formatTime Time.utc post.time) ]
                                ]
                                row
                    in
                    Posts.postTable Config.defaultConfig currentTime Data.posts
                        |> Q.fromHtml
                        |> Q.findAll [ S.tag "tr", S.containing [ S.tag "td" ] ]
                        |> Expect.all
                            (filteredPosts |> List.indexedMap (\i post rows -> rows |> Q.index i |> rowContainsFields post))
            ]
        , describe "uses relative time"
            [ test "the relative time is shown using a title attribute" <|
                \_ ->
                    let
                        filteredPosts =
                            Data.posts |> Config.filterPosts Config.defaultConfig

                        rowContainsFields : Post -> Q.Single msg -> Expect.Expectation
                        rowContainsFields post row =
                            Expect.all
                                [ Q.has [ S.text "days", S.text "ago" ]
                                ]
                                row
                    in
                    Posts.postTable Config.defaultConfig currentTime Data.posts
                        |> Q.fromHtml
                        |> Q.findAll [ S.tag "tr", S.containing [ S.tag "td" ] ]
                        |> Expect.all
                            (filteredPosts |> List.indexedMap (\i post rows -> rows |> Q.index i |> rowContainsFields post))
            ]
        ]
