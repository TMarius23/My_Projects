module PostsConfigTests exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Html exposing (select)
import Html.Attributes
import Model exposing (Msg(..))
import Model.Post exposing (Post)
import Model.PostsConfig as Config exposing (defaultConfig)
import PostsViewTests
import Test exposing (..)
import Test.Html.Event as Evt
import Test.Html.Query as Q
import Test.Html.Selector as S
import TestData as Data
import TestUtils
import Time exposing (Month(..))
import Util.Time exposing (Date(..))
import View.Posts as Posts


suite : Test
suite =
    describe "module Model.PostsConfig"
        [ describe "showTextOnly"
            [ test "text posts are removed when showTextOnly is False" <|
                \_ ->
                    Data.posts
                        |> Config.filterPosts (Config.PostsConfig 50 50 Config.None True False)
                        |> TestUtils.expectEach (\e -> e.url /= Nothing |> Expect.equal True |> Expect.onFail ("Found post where the url field is Nothing: " ++ Debug.toString e))
            ]
        , describe "showJobs"
            [ test "job posts are removed when showJobs is False" <|
                \_ ->
                    Data.posts
                        |> Config.filterPosts (Config.PostsConfig 50 50 Config.None False True)
                        |> TestUtils.expectEach (\e -> e.type_ /= "job" |> Expect.equal True |> Expect.onFail ("Found post where the type_ field is \"job\": " ++ Debug.toString e))
            ]
        , describe "postsToShow"
            [ test "the number of posts returned is at most postsToShow" <|
                \_ ->
                    Data.posts
                        |> Config.filterPosts (Config.PostsConfig 50 10 Config.None True True)
                        |> Expect.equalLists (List.take 10 Data.posts)
            ]
        , describe "sortBy"
            [ test "The final list is not sorted when sortBy is None" <|
                \_ ->
                    Data.posts
                        |> Config.filterPosts (Config.PostsConfig 50 10 Config.None True True)
                        |> Expect.equalLists (List.take 10 Data.posts)
            , test "The final list is sorted by title when sortBy is Title" <|
                \_ ->
                    Data.posts
                        |> Config.filterPosts (Config.PostsConfig 50 10 Config.Title True True)
                        |> Expect.equalLists (Data.posts |> List.take 10 |> List.sortBy .title)
            , test "The final list is sorted descending by score when sortBy is Score" <|
                \_ ->
                    Data.posts
                        |> Config.filterPosts (Config.PostsConfig 50 10 Config.Score True True)
                        |> Expect.equalLists (Data.posts |> List.take 10 |> List.sortBy .score |> List.reverse)
            ]
        , describe "applyChanges"
            [ test "The ConfigChange message is sent when the \"Show job posts\" checkbox is clicked" <|
                \_ ->
                    PostsViewTests.triggerConfigChangedEvent (PostsViewTests.ShowJobPostsCheckbox True)
                        |> Result.map (\change -> Config.applyChanges change Config.defaultConfig)
                        |> Result.map (Expect.equal { defaultConfig | showJobs = True })
                        |> Result.withDefault (Expect.fail "Invalid message")
            , test "The ConfigChange message is sent when the \"Show text only posts\" checkbox is clicked" <|
                \_ ->
                    PostsViewTests.triggerConfigChangedEvent (PostsViewTests.ShowTextOnlyPostsCheckbox False)
                        |> Result.map (\change -> Config.applyChanges change Config.defaultConfig)
                        |> Result.map (Expect.equal { defaultConfig | showTextOnly = False })
                        |> Result.withDefault (Expect.fail "Invalid message")
            , test "The ConfigChange message is sent when the \"Posts to show\" select is changed" <|
                \_ ->
                    PostsViewTests.triggerConfigChangedEvent (PostsViewTests.PostsToShowSelect 50)
                        |> Result.map (\change -> Config.applyChanges change Config.defaultConfig)
                        |> Result.map (Expect.equal { defaultConfig | postsToShow = 50 })
                        |> Result.withDefault (Expect.fail "Invalid message")
            , test "The ConfigChange message is sent when the \"Sort by\" select is changed" <|
                \_ ->
                    PostsViewTests.triggerConfigChangedEvent (PostsViewTests.SortBySelect Config.Title)
                        |> Result.map (\change -> Config.applyChanges change Config.defaultConfig)
                        |> Result.map (Expect.equal { defaultConfig | sortBy = Config.Title })
                        |> Result.withDefault (Expect.fail "Invalid message")
            ]
        ]
