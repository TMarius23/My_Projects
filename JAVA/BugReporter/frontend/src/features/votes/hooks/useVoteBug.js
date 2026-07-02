import {useMutation, useQueryClient} from '@tanstack/react-query';
import {bugKeys, userKeys} from '@shared/api/queryKeys.js';
import {applyVote} from '@shared/utils/voteUtils.js';
import {voteService} from '../services/voteService.js';

function updateBugInPage(pageData, bugId, type) {
    if (!pageData?.content) return pageData;

    return {
        ...pageData,
        content: pageData.content.map((bug) => (
            String(bug.id) === String(bugId) ? applyVote(bug, type) : bug
        )),
    };
}

export function useVoteBug() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: voteService.voteBug,
        onMutate: async ({bugId, type}) => {
            await Promise.all([
                queryClient.cancelQueries({queryKey: bugKeys.lists}),
                queryClient.cancelQueries({queryKey: bugKeys.detail(bugId)}),
            ]);

            const previousLists = queryClient.getQueriesData({queryKey: bugKeys.lists});
            const previousDetail = queryClient.getQueryData(bugKeys.detail(bugId));

            queryClient.setQueriesData(
                {queryKey: bugKeys.lists},
                (pageData) => updateBugInPage(pageData, bugId, type),
            );

            queryClient.setQueryData(
                bugKeys.detail(bugId),
                (bug) => applyVote(bug, type),
            );

            return {previousLists, previousDetail};
        },
        onSuccess: (result, variables, context) => {
            if (!result.success) {
                context?.previousLists?.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
                queryClient.setQueryData(bugKeys.detail(variables.bugId), context?.previousDetail);
                return;
            }
            queryClient.invalidateQueries({queryKey: userKeys.topHunters});
            queryClient.invalidateQueries({queryKey: bugKeys.detail(variables.bugId)});
        },
        onError: (_error, variables, context) => {
            context?.previousLists?.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });
            queryClient.setQueryData(bugKeys.detail(variables.bugId), context?.previousDetail);
        },
    });
}
