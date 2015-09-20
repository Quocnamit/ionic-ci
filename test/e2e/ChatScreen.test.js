describe('Chat Screen', function() {

    it('should delete a chat when delete button is clicked', function() {
        element(by.partialLinkText('Chats')).click();
        expect(element(by.css('div[nav-bar=active] .title')).getText()).toEqual('Chats');
        element(by.partialLinkText('Ben Sparrow')).click();
        expect(element(by.css('div[nav-bar=active] .title')).getText()).toEqual('Ben Sparrow');
    });
});
