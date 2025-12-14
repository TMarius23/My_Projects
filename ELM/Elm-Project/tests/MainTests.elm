module MainTests exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Html exposing (select)
import Html.Attributes
import Json.Encode exposing (Value)
import Main
import Model exposing (Msg(..))
import Model.Post exposing (Post)
import Model.PostsConfig as Config
import ProgramTest
import SimulatedEffect
import Test exposing (..)
import Test.Html.Event as Evt
import Test.Html.Query as Q
import Test.Html.Selector as S
import TestData as Data
import TestUtils as Utils
import Time exposing (Month(..))
import Util.Time exposing (Date(..))
import View.Posts as Posts


checkConfigChangeEffect : List S.Selector -> ( String, Value ) -> (Q.Single Msg -> Expectation) -> (Q.Single Msg -> Expectation) -> Expectation
checkConfigChangeEffect selector event preCond postCond =
    SimulatedEffect.fromLoadedState
        |> ProgramTest.ensureView (Q.find selector >> preCond)
        |> ProgramTest.simulateDomEvent (Q.find selector) event
        |> ProgramTest.expectView (Q.find selector >> postCond)


suite : Test
suite =
    describe "module Main"
        [ describe "Main.update handles config update message"
            [ test "The ConfigChange message is sent when the \"Show job posts\" checkbox is clicked" <|
                \_ ->
                    checkConfigChangeEffect
                        [ S.tag "input", S.attribute (Html.Attributes.type_ "checkbox"), S.id "checkbox-show-job-posts" ]
                        (Evt.check True)
                        (Q.has [ S.checked False ])
                        (Q.has [ S.checked True ])
            , test "The ConfigChange message is sent when the \"Show text only posts\" checkbox is clicked" <|
                \_ ->
                    checkConfigChangeEffect
                        [ S.tag "input", S.attribute (Html.Attributes.type_ "checkbox"), S.id "checkbox-show-text-only-posts" ]
                        (Evt.check False)
                        (Q.has [ S.checked True ])
                        (Q.has [ S.checked False ])
            , test "The ConfigChange message is sent when the \"Posts to show\" select is changed" <|
                \_ ->
                    checkConfigChangeEffect
                        [ S.tag "select", S.id "select-posts-per-page" ]
                        (Evt.input "50")
                        (Expect.all [ Q.has [ S.tag "option", S.attribute (Html.Attributes.value "10"), S.selected True ], Q.has [ S.tag "option", S.attribute (Html.Attributes.value "50"), S.selected False ] ])
                        (Expect.all [ Q.has [ S.tag "option", S.attribute (Html.Attributes.value "50"), S.selected True ], Q.has [ S.tag "option", S.attribute (Html.Attributes.value "10"), S.selected False ] ])
            , test "The ConfigChange message is sent when the \"Sort by\" select is changed" <|
                \_ ->
                    checkConfigChangeEffect
                        [ S.tag "select", S.id "select-sort-by" ]
                        (Evt.input "Title")
                        (Expect.all [ Q.has [ S.tag "option", S.attribute (Html.Attributes.value "None"), S.selected True ], Q.children [ S.tag "option", S.selected True ] >> Q.count (Expect.equal 1) ])
                        (Expect.all [ Q.has [ S.tag "option", S.attribute (Html.Attributes.value "Title"), S.selected True ], Q.children [ S.tag "option", S.selected True ] >> Q.count (Expect.equal 1) ])
            ]
        ]
